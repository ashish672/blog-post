import {useEffect, useState} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useQueryClient } from "react-query";
import { Spinner, ListGroup, Button, Container } from "react-bootstrap";
import Post from "./components/Post";
import PostBody from "./components/PostBody";


// Fetch Request to fetch posts 
const fetchPosts = async(page) => {
  const response = await fetch (`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
  const result = await response.json();
  return result;
}

function App() {

 
  const queryClient = useQueryClient()

  const [page, setpage] = useState(1);

  const [singlePost , setSinglePost] = useState(null)

  const {isLoading, isError, isSuccess, data, error} = useQuery(['posts' , page], () => fetchPosts(page))


  useEffect(() => {
    if(page < 10)  {
      queryClient.prefetchQuery(['posts' , page + 1] , () => fetchPosts(page+1))
    }
}, [page,  queryClient])



  if(isLoading) return <Spinner animation = 'border'></Spinner>

  if(isError) return <div>{error}</div>

  return (
    <div className="App">
      <Container className = 'd-flex justify-center flex-column'>

      <h1 className = 'my-4'>Blog 'em lpsum</h1>
      <ListGroup variant="flush">
      {isSuccess && data.map((post , index) => 
        (<PostBody post = {post} index = {index} setSinglePost = {setSinglePost} />)
      )}
      </ListGroup>


      <div className="my-4">
      <Button variant = 'dark' disabled = { page <= 1 } onClick = {() => setpage(prevPage => prevPage - 1)}>Previous</Button>
      <span className= 'mx-5'>Page { page }</span> 
      <Button variant = 'dark' disabled = { page >= 10 } onClick = {() => setpage(prevPage => prevPage + 1)}>Next</Button>
      <hr/>
      </div>

      {
          singlePost && <Post singlePost = {singlePost}/>
        }


      </Container>
    </div>
  );
}

export default App;
