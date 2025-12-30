import React from 'react';
import CardUI from '../components/Card';
import './Beli.css';
import { Link } from 'react-router-dom';
import { Card } from 'pixel-retroui';
import { Button } from 'pixel-retroui';

const Beli: React.FC = () => {
  // Dummy data
  
  const myCards = [
    { id: 1, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 2, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 3, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
    { id: 4, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 5, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 6, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
  ];

  return (
    <div className="beli-page-container">
      <div className='pokeball'>
        <Card
          bg="white"
          textColor="black"
          borderColor="black"
          shadowColor="black"
          className="text"
          >
            <div className="pokeball-content">
              <img src="/pokeball.png" alt="pokeball" className="item-icon"/>
              <span className="item-quantity">999999999999</span>
            </div>
        </Card>
      </div>
      <div className='jual'>
        <Link to="/jual">
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className='button-jual'
            >
            JUAL KARTU
          </Button>
        </Link>
      </div>
      <div className="card-grid">
        {myCards.map((card) => (
          <div className="card-wrapper" key={card.id}>
            
            <Link to="/cancel">
              <Button
                bg="#f0003c"
                textColor="black"
                borderColor="black"
                shadow="black"
                className="button-cancel"
              >
                CANCEL
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <CardUI
                name={card.name}
                image={card.image}
              />
            </Link>

          </div>
        ))}
      </div>
      <div className='market'>
        <img className='logo-market' src="/market.png" alt="Market Logo" />
        <div className="card-grid-market">
          {myCards.map((card) => (
            <div className="card-wrapper-market" key={card.id}>
              
              <Link to="/konfirmasi">
                <Button
                  bg="#f764c1"
                  textColor="black"
                  borderColor="black"
                  shadow="black"
                  className="button-konfirmasi"
                >
                  BELI
                </Button>
              </Link>

              <Link to="/" style={{ textDecoration: 'none' }}>
                <CardUI
                  name={card.name}
                  image={card.image}
                />
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beli;
