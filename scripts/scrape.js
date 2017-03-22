/* eslint no-console: "off" */

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const Promise = require('bluebird');
const Inliner = require('inliner');

const baseUrl = 'https://developer.mozilla.org';
const jsUrl = '/en-US/docs/Web/JavaScript';
const prefix = '/en-US/docs/Web/JavaScript/Reference/Global_Objects/';
const templatePath = 'scripts/template.html';
const outputPath = 'src/articles';

function getPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (response.statusCode !== 200) {
                reject(new Error(`code ${response.statusCode}`));
            } else {
                resolve(cheerio.load(body));
            }
        });
    });
}

function scrapeArticle(url) {
    return getPage(url).then(($) => {
        const article = $('#wikiArticle');
        const codeSections = article.find('pre.js');
        const links = article.find('a');
        const template = fs.readFileSync(templatePath, 'utf8');
        const $$ = cheerio.load(template);

        // Modify the code sections
        codeSections.each((index, codeSection) => {
            $(codeSection).removeClass();
            $(codeSection).contents().wrap('<code class="language-js" />');
        });

        // Remove anchor links
        links.each((index, link) => $(link).replaceWith($(link).contents()));

        // Remove everything after Specifications
        const children = article.contents();
        let found = false;
        children.each((index, child) => {
            const element = $(child);
            if (!found) {
                found = (element.attr('id') === 'Specifications');
            }
            if (found) {
                element.remove();
            }
        });

        // Render the resulting html
        const parts = url.split('/');
        const title = parts[parts.length - 1];
        const file = `scripts/${title}.html`;
        $$('#article-content').append(article);
        fs.writeFileSync(file, $$.html());

        // Inline everything into a minified html document
        return new Promise((resolve, reject) => (
            new Inliner(file, (error, html) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(html);
                }
            })
        )).then((html) => {
            fs.unlinkSync(file);
            fs.writeFileSync(`${outputPath}/${title}.html`, html);
            console.log(`Scraped ${title}`);
        });
    });
}

getPage(`${baseUrl}${jsUrl}`).then(($) => {
    const objects = $('#quick-links li').filter((index, element) => {
        const href = $(element).find('a').attr('href');
        const icon = $(element).find('i');
        return (href && href.slice(0, prefix.length) === prefix && icon.length === 0);
    }).map((index, element) => $(element).find('a').attr('href'));
    return Promise.map(objects.toArray(), url =>
        scrapeArticle(`${baseUrl}${url}`), { concurrency: 5 });
}).catch(error => console.error(error));
