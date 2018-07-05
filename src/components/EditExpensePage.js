import React from 'react';

const EditExpensePage = (props) =>(
    <div>
        This is from my edit page {props.match.params.id}
    </div>
);

export default EditExpensePage;