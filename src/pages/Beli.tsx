import React, { useEffect, useState } from 'react';
import CardUI from '../components/Card';
import './Beli.css';
import { Link } from 'react-router-dom';
import { Card, Popup } from 'pixel-retroui';
import { Button } from 'pixel-retroui';

interface UserCard {
  card_user_id: number;
  card_id: number;
  card_name: string;
  image: string; 
  stars: number;
}

const Beli: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isFromMarket, setIsFromMarket] = React.useState(false);
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [cardsMarket, setCardsMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
  
  // Get user from localStorage
  const getUserFromLocalStorage = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr || userStr === 'undefined') return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };
  
  const [user, setUser] = useState<any>(getUserFromLocalStorage());
      
  const fetchUserCards = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      const response = await fetch('http://127.0.0.1:5000/api/v1/profile/get?sell=false', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData.message);
        setUserCards([]); 
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      
      if (result && result.data.cards) {
        const filteredCards = result.data.cards.filter((card: UserCard) => card.is_in_market === true);
        setUserCards(filteredCards);
        console.log("User cards data sell:", result.data.cards);
      } else {
        console.warn("Data 'cards' tidak ditemukan dalam response:", result);
        setUserCards([]); 
      }

      if (result && result.data.user) {
        console.log("User data:", result.data.user);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        setUser(result.data.user);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Network Error:", error);
      setUserCards([]); 
      setIsLoading(false);
    }
  };

  const fetchMarketCards = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      const response = await fetch('http://127.0.0.1:5000/api/v1/market/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData.message);
        setUserCards([]); 
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      
      if (result && result.data.market) {
        console.log("Market data:", result.data.market);
        console.log("User data for filtering:", user);
        const filteredCards = result.data.market.filter((card: any) => card.seller_id !== user?.id);
        setCardsMarket(filteredCards);
      } else {
        console.warn("Data 'cards' tidak ditemukan dalam response:", result);
        setCardsMarket([]); 
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Network Error:", error);
      setUserCards([]); 
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserCards();
      fetchMarketCards();
    };
    fetchData();
  }, []);

  const cancelSellCard = async (market_id: number) => {
    try {
      const access_token = localStorage.getItem("access_token")

      if (!access_token) {
        alert("Harap Login Terlebih Dahulu")
      }
      
      const response = await fetch(`http://127.0.0.1:5000/api/v1/sell/cancel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ id: market_id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData.message);
        alert("Gagal membatalkan penjualan kartu.");
        return;
      }

      alert("Penjualan kartu berhasil dibatalkan.");
      // Refresh the user cards after canceling the sale
      fetchUserCards();
    } catch (error) {
      console.error("Network Error:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const buyCard = async (market_id: number) => {
    try {
      const access_token = localStorage.getItem("access_token")

      if (!access_token) {
        alert("Harap Login Terlebih Dahulu")
      }
      
      const response = await fetch(`http://127.0.0.1:5000/api/v1/beli/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ id: market_id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData.message);
        alert("Gagal Membeli kartu.");
        return;
      }

      alert("Pembelian kartu berhasil dilakukan.");
      // Refresh the user cards after canceling the sale
      fetchMarketCards();
    } catch (error) {
      console.error("Network Error:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  const handleButtonYesClick = (): void => {
    // Logic for Yes button click
    console.log("target: ", isFromMarket);

    if (!isFromMarket && selectedCard) {
      cancelSellCard(selectedCard.market_id);
      closePopup();
    } else {
      buyCard(selectedCard!.market_id);
      closePopup();
    }
  }

  const openPopup = (isFromMarket: boolean, data: UserCard): void => {
    setIsFromMarket(isFromMarket);
    setIsPopupOpen(true);
    setSelectedCard(data);
    console.log("selected card: ", data);
  }
  
  
  if (isLoading) return <div className="loading-text">Memuat Koleksi Kartu...</div>;
  
  return (
    <div className="beli-page-container">
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        bg="#fefcd0"
        baseBg="#c381b5"
        textColor="black"
        borderColor="black"
      >
        Are You Sure execute this action? <br /><br />
        {isFromMarket &&
        <div>
          Price: {selectedCard?.price} <img src="/pokeball.png" alt="pokeball" className="item-icon-popup"/>
        </div>
      }
       <div className='button-popup flex flex-col gap-4 items-center justify-center'>
         <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className='px-4'
            onClick={handleButtonYesClick}
          >
            Yes
          </Button>
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            className='px-4'
            onClick={closePopup}
          >
            No
          </Button>
       </div>
      </Popup>
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
              <span className="item-quantity">{user ? user.gold : 0}</span>
            </div>
        </Card>
      </div>
      <div className='jual'>
        <Link to="/sell">
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
        {userCards.length === 0 && (<p className="no-cards-text">Tidak ada kartu yang sedang dijual di pasar.</p>
        )}
        {userCards.map((card) => (
          <div className="card-wrapper" key={card.card_user_id}>
              <Button
                bg="#f0003c"
                textColor="black"
                borderColor="black"
                shadow="black"
                className="button-cancel"
                onClick={() => openPopup(false, card)}
              >
                CANCEL
              </Button>

              <CardUI
                name={card.card_name}
                image={"http://127.0.0.1:5000"+card.image}
                stars={card.stars}
              />

          </div>
        ))}
      </div>
      <div className='market'>
        <img className='logo-market' src="/market.png" alt="Market Logo" />
        <div className="card-grid-market">
          {cardsMarket.map((card) => (
            <div className="card-wrapper-market" key={card.market_id}>
              
                <Button
                  bg="#f764c1"
                  textColor="black"
                  borderColor="black"
                  shadow="black"
                  className="button-konfirmasi"
                  onClick={() => openPopup(true, card)}
                >
                  BELI
                </Button>

              <Link to="/" style={{ textDecoration: 'none' }}>
                <CardUI
                  name={card.card_name}
                  image={"http://127.0.0.1:5000"+card.image}
                  stars={card.stars}
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
