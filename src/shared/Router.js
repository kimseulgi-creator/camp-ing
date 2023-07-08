import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Join from '../pages/Join';
import List from '../pages/List';
import Write from '../pages/Write';
import Detail from '../pages/Detail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/list" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
