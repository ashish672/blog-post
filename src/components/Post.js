import React from "react";
import { useMutation, useQuery } from "react-query";
import { Spinner, Button } from "react-bootstrap";
import Comment from "./Comment";

const fetchPostComment = async (id) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const result = await response.json();
    return result;
};

const updatePost = async (postId) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                id: 1,
                title: "foo",
                body: "bar",
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    );
    const result = await response.json();
    return result;
};

const deletePost = async (postId) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
            method: "DELETE",
        }
    );
    const result = await response.json();
    return result;
};

const Post = ({ singlePost }) => {

    const { isLoading, isError, isSuccess, data, error } = useQuery(
        ["comment", singlePost.id],
        () => fetchPostComment(singlePost.id)
    );

    const updateMutation = useMutation(() => updatePost(singlePost.id))
    const deleteMutation = useMutation(() => deletePost(singlePost.id))


    return (
        <div>
            <h3>{singlePost.title}</h3>
            <p>{singlePost.body}</p>

            {deleteMutation.isError && <p style={{color : "red"}}> Error in deleting the post!</p>}
                    {deleteMutation.isLoading && <p style={{color : "black"}}> Loading...</p>}
                    {deleteMutation.isSuccess && <p style={{color : "green"}}> Post Deleted!</p>}

            {
                        updateMutation.isError && <p style={{color : 'red'}}>Error in updating the post!</p>
                    }
                    {
                        updateMutation.isSuccess && <p style={{color : 'green'}}> Post Updated!</p>

                    }
                    {
                        updateMutation.isLoading && <p style={{color : 'black'}}> Loading...</p>
                    }
            <Button className="m-2" variant="dark" onClick = {() => deleteMutation.mutate()} >
                Delete
            </Button>
            <Button className="m-2" variant="dark" onClick = {() => updateMutation.mutate()}>
                Update Title
            </Button>

            <h4>Comments</h4>
            <hr />
            {isLoading && <Spinner animation="border"></Spinner>}
            {isError && <p>{error}</p>}
            {isSuccess &&
                data.map((comment) => <Comment key={comment.id} comment={comment} />)}
        </div>
    );
};

export default Post;
