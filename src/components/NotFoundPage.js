import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const NotFoundPage = () =>(
    <div>
        404 Page not found <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;