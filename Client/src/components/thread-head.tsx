
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/posts/${pid}`);
  }
  return (
    <PostContainer onClick={handleClick}>
      <h2>id: {pid}</h2>
      <p>{body}</p>
    </PostContainer>
  );
};

export default Thread;