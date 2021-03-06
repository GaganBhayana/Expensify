
import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';

const ExpenseListItem = ({dispatch,id,description,amount,createdAt}) =>{// taking props
   // here we are not directly taking evrerything inside props but destructuring it
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>            
        </div>
    )
}

export default connect()(ExpenseListItem);