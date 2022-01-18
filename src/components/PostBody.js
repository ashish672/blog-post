import React from 'react'
import {ListGroup} from "react-bootstrap"
const Post = ({post, index, setSinglePost}) => {
    return (
        (<ListGroup.Item 
            variant= {index % 2 === 0 ? 'light' : 'dark'} 
            key = {post.id}
            onClick = {() => setSinglePost(post)}
            > 
            {post.title} 
          </ListGroup.Item>)
    )
}

export default Post
