
import React from 'react';
import styled from 'styled-components';

interface PostProps {
  body:string;
  id: string;
  reply?: PostProps[] | null;
  depth?: number | null;
}

interface PostContainerProps {
  depth?: number | null;
}

const PostContainer = styled.div<PostContainerProps>`
  padding: 5px;
  min-width: 400px;
  width: 50%;
  border: 1px solid #ccc;
  margin: 10px 0;
  margin-left: ${props => props.depth? props.depth * 20 : 10}px;
  border-radius: 3px;
  `

const Post: React.FC<PostProps> = ({ body, id, reply = null, depth = 0 }) => {

  return (
    <React.Fragment>
        <PostContainer depth = {depth}>
            <h4>id: {id}</h4>
            <p>{body}</p>
        </PostContainer>
        {reply && reply.map((rep) => (
            <Post depth = {depth? depth+1: 1} id = {rep.id} body ={rep.body} reply = {rep.reply} />
        ))
        }
    </React.Fragment>
  );
};

export default Post;