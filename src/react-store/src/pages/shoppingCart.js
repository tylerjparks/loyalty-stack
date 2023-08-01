import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../src/css/main.css";
import {Button} from "@mui/material";
import { Cart } from '../classes/Cart.js';

// Shopping Cart page
const ShoppingCart = ({cart, setCart, user, setOrder}) => {

  const navigate = useNavigate();
  setOrder(null);

  console.log("Shopping cart: ", cart);

  // fetch function to retrieve loyalty bonus data
  const fetchBonus = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/bonusRules", {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((bonusData) => {
        //setBonus(bonusData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const decimals = (int) => {
    var temp = int
    return temp.toFixed(2)
  };

  return (
    <div style={{margin: '0px 0px 0px 320px'}}>
      
      {/* Title */}
      <h1 style={{ display: 'flex', 
                  justifyContent: 'left', 
                  padding: '20px 0px 40px 0px',
                  fontSize: '42px'}}> 
      Shopping Cart
      </h1>


      {/* Line Break */}
      <h2 style={{fontSize: '22px'}}>Your Items</h2>
      <hr style={{ borderTop: '1px solid black'}}/>


      {/* 
      Accessing Order Information
      {console.log(order[0].id)}
      {console.log(order[0].salesOrderDetails[0].productName)}
      */}

      <div style={{padding: '0px 0px 20px 0px'}}>
        {cart.salesOrderDetails.length === 0 &&
          <div><b>Your cart is empty</b></div>
        }
        {cart.salesOrderDetails.map((detail, index) => {
          // render all the game cards
          return (
            <div>
              <div><b>Item #{index + 1}</b></div>
              {<img src={'../images/' + detail.productImg} alt="thumbnail" width="50px" />}
              <div><b>Product Name:</b> {detail.productName} </div>
              <div><b>Quantity:</b> {detail.quantity} </div>
              <div><b>Unit Price:</b> ${detail.unitPrice.toFixed(2)} </div>
              <div><b>Item Total:</b> ${detail.lineNetAmount.toFixed(2)} </div>
              <br></br><br></br>
            </div>
          );
        })}
      </div>

      {/* Line Break */}
      <h2 style={{fontSize: '22px'}}>Proceed to Checkout with:</h2>
      <hr style={{ borderTop: '1px solid black'}}/>


      {/* Access Order Total */}
      <div style={{padding: '0px 0px 20px 0px'}}>
        <div>+ Shipping and Handling: ${cart.shippingAndHandling.toFixed(2)} <i>(Calculated at checkout)</i></div>
        <div>+ Tax: ${cart.taxAmount.toFixed(2)}  <i>(Calculated at checkout)</i></div>
        <div>
          <h2 style={{fontSize: '22px'}}>
            Sub-Total: ${cart.grossAmount.toFixed(2)} 
          </h2>
        </div>
      </div>


      {/* Loyalty Points Prompt */}
      <div style={{padding: '20px 0px 20px 0px'}}>
        <div>You can earn <b>{parseInt(Math.round(cart.netAmount * 10))}</b> loyalty points with this purchase! <i>(10 points per dollar)</i></div>
      </div>


      {/* Checkout Button */}
      {cart.salesOrderDetails.length > 0 &&
      <Button type="submit" variant="contained" className="" color="secondary"
        onClick={() => {
          if (!user) {
            alert(`Please sign in first.`);
            navigate("/signin");
          }
          else {
            navigate("/payment");
          }
        }}
      >
        Checkout
      </Button> }
      <br></br><br></br>
    </div>
  );
};

export default ShoppingCart;
