import React from 'react'

const Comment = ({ comment}) => {
    return (
        <div >
            <p>{comment.name}</p>
            <span>By- {comment.email}</span>
            <hr />
        </div>
    )
}

export default Comment
