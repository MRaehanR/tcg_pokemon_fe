import React from 'react';
import Card from '../components/Card';

import './Profile.css';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  // Dummy data
  const myCards = [
    { id: 1, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 2, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 3, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
    { id: 4, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 5, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 6, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
    { id: 7, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 8, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 9, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
    { id: 10, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" },
    { id: 11, name: "Gastly", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
    { id: 12, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
    
  ];

  return (
    <div className="profile-page-container">
      <div className="status-header">
        <div className="status-main-box">
          <div className="status-row">
            <span className="pkm-name">CHARMANDER</span>
          </div>
          <div className="status-row" style={{ marginTop: '10px' }}>
            <div className="id-group">
              <img src="pokeball.png" alt="ball" />
              <span>1250</span>
            </div>
            <span className="pkm-lv">Lv5</span>
          </div>
        </div>
      </div>
      <div className="card-grid">
        {myCards.map((card) => (
          <Link to="/" key={card.id} style={{ textDecoration: 'none' }}>
            <Card 
              name={card.name} 
              image={card.image} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;