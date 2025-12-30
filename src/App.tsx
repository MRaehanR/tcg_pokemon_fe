import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './pages/Authentication';
import { playBackgroundMusic, stopBackgroundMusic } from './utils/sound';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import FreeGift from './pages/FreeGift';
import Sell from './pages/Sell';
import SetPrice from './pages/SetPrice';
import Profile from './pages/Profile';
import Beli from './pages/Beli';

function App() {
  useEffect(() => {
    playBackgroundMusic('/sounds/background-music.mp3', 0.3, true);

    const startMusic = () => {
      playBackgroundMusic('/sounds/background-music.mp3', 0.3, true);
    };

    document.addEventListener('click', startMusic, { once: true });
    
    return () => {
      document.removeEventListener('click', startMusic);
      stopBackgroundMusic();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Authentication />} />
          <Route path="/login" element={<Login />} />         
          <Route path="/register" element={<Register />} />     
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />     
          <Route path="/free_gift" element={<ProtectedRoute><FreeGift /></ProtectedRoute>} />     
          <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />     
          <Route path="/set-price" element={<ProtectedRoute><SetPrice /></ProtectedRoute>} />  
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />      
          <Route path="/market" element={<ProtectedRoute><Beli /></ProtectedRoute>} />       
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
