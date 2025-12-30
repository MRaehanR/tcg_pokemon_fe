import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './Profile.css';
import { Link } from 'react-router-dom';
import { Button } from 'pixel-retroui';
import { playSound, SOUNDS } from '../utils/sound';

interface UserData {
  username: string;
  gold: number;
}

interface UserCard {
  card_user_id: number;
  card_name: string;
  image: string;
  stars:number;
  is_in_market: boolean;
}

const Profile: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('http://127.0.0.1:5000/api/v1/profile/get', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const result = await response.json();
        
        setUserCards(result.data.cards || []);
        setUserData(result.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <div className="loading-text">Memuat Profile...</div>;

  return (
    <div className="profile-page-container">
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
      <div className="status-header">
        <div className="status-main-box">
          <div className="status-row">
            <span className="pkm-name">{userData?.username.toUpperCase()}</span>
          </div>
          <div className="status-row" style={{ marginTop: '10px' }}>
            <div className="id-group">
              <img src="pokeball.png" alt="ball" />
              <span>{userData?.gold || 0}</span>
            </div>
            <span className="pkm-lv">CARDS: {userCards.length}</span>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {userCards.map((card) => (
          <div key={card.card_user_id} className="relative">
            <Card 
              name={card.card_name} 
              image={`http://127.0.0.1:5000/${card.image}`} 
              stars={card.stars}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;