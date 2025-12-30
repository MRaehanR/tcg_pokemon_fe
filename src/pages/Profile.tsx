import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './Profile.css';

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
            {card.is_in_market && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded border-2 border-black">
                ON MARKET
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;