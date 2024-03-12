import React, { useEffect } from 'react';
import  {usePostsState} from '../utils/storage';
import Post from '../components/post-recursive';
import { useParams } from 'react-router-dom';


interface PageProps {
  // Define props if any
}

const PostTree: React.FC<PageProps> = () => {
  const {posts, isLoading, error, fetchPosts}  = usePostsState ();

  const {pageNumber} = useParams();

  useEffect(() => {
    fetchPosts(pageNumber);
  }, [pageNumber, fetchPosts]); // Add dependencies if needed

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const tree = posts.tree
  
  return (
    <div>
      <p>Tree of posts </p>
      <div>
        <Post id = {tree.id} body ={tree.body} reply = {tree.reply? tree.reply : null}/>
      </div>
    </div>
  );
};

export default PostTree;