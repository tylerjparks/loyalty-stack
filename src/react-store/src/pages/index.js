import React from 'react'
import { useEffect, useState } from "react";
import backgroundVideo from '../atariVideo.mp4'
import "../../src/css/main.css";

// Home page

const Home = () => {

  let [offers, setOffers] = useState(null);

  async function fetchOffers() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/offers", {
      mode: "cors",
      method: "GET"
    });
    const offers = await response.json();
    return offers;
  }

  const loadOffers = () => {
    fetchOffers()
    .then((offers) => {
      setOffers(offers);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  useEffect(() => {
    loadOffers();
  }, [])

  return (
    <div style={{ marginLeft: '90px' }}>
      <div className='overlay' style={
        { position: 'absolute',
          top: 0,
          left: '90px',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }
      }></div>

      <video style={{marginBottom: '-12px'}} src={backgroundVideo} autoPlay loop muted/>

      <h1 style={
          { fontSize: '68px',
            fontWeight: 'bold',
            width: '100%',
            height: '60%',
            top: 0,
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'}
        } 
      >
        Welcome to the World of Atari!
      </h1>

      <div style={
        {
          fontSize: '35px',
          fontWeight: 'bold',
          width: '100%',
          height: '40%',
          top: 400,
          left: 200,
          position: 'absolute',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }
      }>
        <h2>Join our Loyalty program and take advantages of these great offers:</h2>
        <br></br>
      {offers &&
        offers.map((offer) => {
          let startDate = Date.parse(offer.startDate);
          let endDate = Date.parse(offer.endDate);
          let currentDate = Date.now();
          if (startDate < currentDate && currentDate < endDate) {
            return (
              <div style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>{offer.bonusDescription}</div>
            );
          }
        })
      }
      </div>

    </div>
  );
};

export default Home;
