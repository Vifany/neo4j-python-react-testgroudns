import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  useThreadsState from './utils/storage';

// Components
import Threads from './pages/threads';

const App: React.FC = () => {
  const {fetchThreads}  = useThreadsState ();
  useEffect(() => {
    fetchThreads();
  },[]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Threads />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;