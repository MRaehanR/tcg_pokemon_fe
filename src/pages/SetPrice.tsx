import React from 'react';
import './SetPrice.css';
import { Button } from 'pixel-retroui';
import { Card } from 'pixel-retroui';
import { Input } from 'pixel-retroui';
import { Link } from 'react-router-dom';



function SetPrice() {

  const sellCard = () => {

  };

  return (
    <div className='set-price-container'>
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
          <h2 className="text-2xl font-bold mb-4 text-center">
            HARGA :
          </h2>
  
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
      <div className="set-price-button">
        <Link to="/sell">
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className="button"
          >
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