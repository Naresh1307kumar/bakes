import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignatureMenu from './pages/SignatureMenu';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<SignatureMenu />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
