import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  {useThreadsState} from './utils/storage';

// Components
import Threads from './pages/threads';
import PostTree from './pages/post-tree';

const App: React.FC = () => {
  const {fetchThreads}  = useThreadsState ();
  useEffect(() => {
    fetchThreads();
  },[]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path ="/posts/:pageNumber" element = {<PostTree />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;