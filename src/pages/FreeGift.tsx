import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FreeGift.css';
import { Button, Popup } from 'pixel-retroui';
import { playSound, SOUNDS } from '../utils/sound';

function FreeGift(){
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const navigate = useNavigate()

  const handleButtonPokeball = async () => {
    playSound(SOUNDS.CLICK, 1);
    console.log('Pokeball')

    try {
      const access_token = localStorage.getItem("access_token")

      if (!access_token) {
        alert("Harap Login Terlebih Dahulu")
      }
      
      const response = await fetch("http://127.0.0.1:5000/api/v1/free_gift/free", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseResult = await response.json();

      if (!response.ok) {
        console.error("Claim failed:", responseResult.message);
        alert(responseResult.message);
        return;
      }

      console.log("Claim successful:", responseResult);

      playSound(SOUNDS.SUCCESS, 1);
      setIsPopUpOpen(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleButtonGachaCard = () => {
    playSound(SOUNDS.CLICK, 1);
    console.log('card')
  }

  const popUpOnClose = () => {
    setIsPopUpOpen(false)
  }

    return (
        <div className='auth-container'>
           <Popup
            isOpen={isPopUpOpen}
            onClose={popUpOnClose}
            bg="#fefcd0"
            baseBg="#c381b5"
            textColor="black"
            borderColor="black"
          >
            Yeyy Kamu Mendapatkan 
            <img className='pokeball-claim' src="/pokeball.png" alt="Game Title" />
            100 Pokeballs 
          </Popup>
          <img className='game-title' src="/game_title.png" alt="Game Title" />
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className='button-pokeball'
            onClick={handleButtonPokeball}
          >
            <img className='pokeball' src="/pokeball.png" alt="Game Title" />
            100
          </Button>
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className=''
            onClick={handleButtonGachaCard}
          >
            1x Gacha Card
          </Button>
        </div>
      );
}

export default FreeGift;