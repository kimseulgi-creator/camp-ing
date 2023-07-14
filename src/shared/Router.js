import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Join from '../pages/Join';
import List from '../pages/List';
import Write from '../pages/Write';
import Detail from '../pages/Detail';
import EditDetail from '../pages/EditDetail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/list" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/editdetail/:id" element={<EditDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
