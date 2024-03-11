import React, { useEffect } from 'react';
import  useThreadsState from '../utils/storage';

interface PageProps {
  // Define props if any
}

const Threads: React.FC<PageProps> = () => {
  const {data, isLoading, error, fetchThreads}  = useThreadsState ();

  useEffect(() => {
    fetchThreads();
  }, []); // Add dependencies if needed

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>This is a React TypeScript Page</h1>
      <p>Data fetched from the store: </p>
      <ul>
        {data.threads.map((thread) => (
          <li key={thread.id}>{thread.id} : {thread.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Threads;