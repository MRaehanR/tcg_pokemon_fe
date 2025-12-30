import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FreeGift.css';
import { Button, Popup } from 'pixel-retroui';
import Card from '../components/Card';
import { playSound, SOUNDS } from '../utils/sound';

function FreeGift(){
  const [isPopUpClaimPokeballOpen, setIsPopUpClaimPokeballOpen] = useState(false);
  const [isPopUpClaimCardOpen, setIsPopUpClaimCardOpen] = useState(false);
  const [isCardData, setIsCardData] = useState(null);

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
      setIsPopUpClaimPokeballOpen(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleButtonGachaCard = async () => {
    playSound(SOUNDS.CLICK, 1);
    console.log('card')

    try {
      const access_token = localStorage.getItem("access_token")

      if (!access_token) {
        alert("Harap Login Terlebih Dahulu")
      }
      
      const response = await fetch("http://127.0.0.1:5000/api/v1/free_gift/reedem_card", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseResult = await response.json();

      if (!response.ok) {
        console.error("Gacha failed:", responseResult.message);
        alert(responseResult.message);
        return;
      }

      setIsCardData(responseResult.data[0].card);

      console.log("Gacha successful:", responseResult);

      playSound(SOUNDS.SUCCESS, 1);
      setIsPopUpClaimCardOpen(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const popUpClaimPokeballOnClose = () => {
    setIsPopUpClaimPokeballOpen(false)
  }

  const popUpClaimCardOnClose = () => {
    setIsPopUpClaimCardOpen(false)
  }

    return (
        <div className='auth-container'>
          <div className="back-button-container">
            <Link to="/menu">
              <Button
                bg="#fefcd0"
                textColor="black"
                borderColor="black"
                shadow="#c381b5"
                onClick={() => playSound(SOUNDS.CLICK, 1)}
              >
                KEMBALI
              </Button>
            </Link>
          </div>
           <Popup
            isOpen={isPopUpClaimPokeballOpen}
            onClose={popUpClaimPokeballOnClose}
            bg="#fefcd0"
            baseBg="#c381b5"
            textColor="black"
            borderColor="black"
          >
            Yeyy Kamu Mendapatkan 
            <img className='pokeball-claim' src="/pokeball.png" alt="Game Title" />
            100 Pokeballs 
          </Popup>
           <Popup
            isOpen={isPopUpClaimCardOpen}
            onClose={popUpClaimCardOnClose}
            bg="#fefcd0"
            baseBg="#c381b5"
            textColor="black"
            borderColor="black"
          >
            YEY KAMU MENDAPATKAN KARTU
            <Card name={isCardData?.name} image={"http://127.0.0.1:5000"+isCardData?.image_path} stars={isCardData?.star} />
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
            Claim
            <img className='pokeball-claim' src="/pokeball.png" alt="Game Title" />
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