import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Button, Card, Input } from 'pixel-retroui';
import { playSound, SOUNDS } from '../utils/sound';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    playSound(SOUNDS.CLICK, 1);
    register();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  const register = async () => {
    try {
      const data = {
        username: username,
        password: password
      };

      if (!data.username || !data.password) {
        console.error("Username and password are required.");
        alert("Username and password are required.");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseResult = await response.json();

      if (!response.ok) {
        console.error("Login failed:", responseResult.message);
        alert(responseResult.message);
        return;
      }

      console.log("Register successful:", responseResult);
      localStorage.setItem("access_token", responseResult.data.access_token);

      playSound(SOUNDS.SUCCESS, 1);
      alert("Register successful!");

      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='flex items-center justify-center gap-4 mt-8'>      
      <Card
        bg="#fefcd0"
        textColor="black"
        borderColor="black"
        shadowColor="#c381b5"
        className="p-4 text-center"
      >
        <h1 className='title'>Register Page</h1>
        <div className='flex items-center justify-center gap-4 mt-1'>
          <Input
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            placeholder="Password"
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
            onClick={handleButtonClick}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Register;
