const defaultState = { };
const ld = require('lodash');

export default function (state = defaultState, action) {
    switch (action.type) {
    case 'spellPress':
        return ld.assign({ }, state, {
            article: action.article,
        });
    default:
        return state;
    }
}
