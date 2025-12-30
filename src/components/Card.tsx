import React from 'react';
import './Card.css';

interface CardProps {
   name: string;
   image: string;
}

const Card: React.FC<CardProps> = ({ name, image }) => {
   return (
      <div className="pokemon-card">
         <div className="image-box">
         <img src={image} alt={name} className="pixel-art" />
         </div>

         <div className="info-box">
         <div className="name-container">
            <span className="name-text">{name}</span>
            <div className="underline"></div>
         </div>
         </div>
      </div>
   );
};

export default Card;