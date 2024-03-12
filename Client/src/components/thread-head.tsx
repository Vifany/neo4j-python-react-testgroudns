
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PostProps {
  body:string;
  pid: string
}


const PostContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
  border-radius: 5px;
  min-width: 400px;
  `

const Thread: React.FC<PostProps> = ({ body, pid }) => {
  return (
  <Link to={`/posts/${pid}`}>
    <PostContainer >
      <h2>id: {pid}</h2>
      <p>{body}</p>
    </PostContainer>
  </Link>
  );
};

export default Thread;