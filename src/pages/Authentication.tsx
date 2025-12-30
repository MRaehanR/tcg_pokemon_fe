import React from 'react';
import { Link } from 'react-router-dom';
import './Authentication.css';
import { Button } from 'pixel-retroui';

function Authentication() {
  return (
    <div className='auth-container'>
      <img className='game-title' src="/game_title.png" alt="Game Title" />
      <Link to="/login">
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className=''
        >
          Register
        </Button>
      </Link>
    </div>
  );
}

export default Authentication;
