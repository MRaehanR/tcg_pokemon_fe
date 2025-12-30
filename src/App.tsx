import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Authentication from './pages/Authentication';
import { playBackgroundMusic, stopBackgroundMusic } from './utils/sound';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';

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
          <Route path="/menu" element={<Menu />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
