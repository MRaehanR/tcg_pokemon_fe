import React, { useState } from 'react';
import './SetPrice.css';
import { Button, Card, Input } from 'pixel-retroui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { playSound, SOUNDS } from '../utils/sound';

function SetPrice() {
  const handleButtonClick = () => {
    playSound(SOUNDS.MENU, 1);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const cardInfo = location.state?.cardInfo; 

  const [price, setPrice] = useState<number | string>("");

  const sellCard = async () => {
    handleButtonClick()
    if (!price || Number(price) <= 0) {
      alert("Masukkan harga yang valid!");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch('http://127.0.0.1:5000/api/v1/sell/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          card_id: cardInfo?.card_user_id, 
          price: Number(price)
        }),
      });

      if (response.ok) {
        alert("Kartu berhasil dipasang untuk dijual!");
        navigate('/sell');
      } else {
        const error = await response.json();
        alert("Gagal menjual: " + error.message);
      }
    } catch (error) {
      console.error("Error selling card:", error);
    }
  };

  if (!cardInfo) {
    return (
      <div className='set-price-container'>
        <p>Silakan pilih kartu terlebih dahulu.</p>
        <Link to="/sell"><Button bg="#fefcd0">Kembali</Button></Link>
      </div>
    );
  }

  return (
    <div className='set-price-container'>
      <p className="mb-2 font-bold">Menjual: {cardInfo.card_name}</p>
      
      <Card
        bg="#fefcd0"
        textColor="black"
        borderColor="black"
        shadowColor="#c381b5"
        style={{ 
          width: '450px', 
          minHeight: '200px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}   
        className="p-8" 
      >
        <div className="!flex !flex-col items-center justify-center w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">HARGA :</h2>
  
          <div className="w-full flex justify-center">
            <div 
              style={{ 
                width: '80%', 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#fefcd0', 
                border: '3px solid black', 
                borderRadius: '8px', 
                padding: '2px 10px'
              }}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
                alt="pokeball" 
                style={{ width: '25px', height: '25px', marginRight: '10px' }}
              />
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>:</span>

              <Input
                bg="transparent"
                textColor="black"
                borderColor="transparent"
                placeholder="999"
                type="number" 
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
                style={{ 
                  width: '100%', 
                  border: 'none', 
                  outline: 'none',
                  boxShadow: 'none'
                }}
                className="text-left font-bold"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="set-price-button flex gap-4 mt-4">
        <Link to="/sell">
          <Button bg="#fefcd0" textColor="black" borderColor="black" shadow="#c381b5" className="button" onClick={handleButtonClick}>
            BATAL
          </Button>
        </Link>
        <Button
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
          shadow="#c381b5"
          className="button"
          onClick={sellCard}
        >
          KONFIRMASI
        </Button>
      </div>
    </div>
  );
}

export default SetPrice;