import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';
import { Button } from 'pixel-retroui';
import { playSound, SOUNDS } from '../utils/sound';

function Menu() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    playSound(SOUNDS.CLICK, 1);
  };

  const handleButtonLogout = () => {
    playSound(SOUNDS.CLICK, 1);
    localStorage.removeItem("access_token");

    navigate("/");
  }

  return (
    <div className='auth-container'>
      <img className='game-title' src="/game_title.png" alt="Game Title" />
      <Link to="/profile">
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className='button'
          onClick={handleButtonClick}
        >
          Profile
        </Button>
      </Link>
      <Link to="/market">
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className='button'
          onClick={handleButtonClick}
        >
          Market
        </Button>
      </Link>
      <Link to="/free_gift">
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className='button'
          onClick={handleButtonClick}
        >
          Free Gift
        </Button>
      </Link>
      <Button
        bg="#fefcd0"
        textColor="black"
        borderColor="black"
        shadow="#c381b5"
        className='button'
        onClick={handleButtonLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Menu;
