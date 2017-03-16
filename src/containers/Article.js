import React from 'react';
import { connect } from 'react-redux';

function Article() {
    return (
        <div>Hello World!</div>
    );
}
export default connect()(Article);
