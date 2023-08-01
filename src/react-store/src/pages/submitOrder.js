import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css/main.css";
import {Button, Select} from "@mui/material";
import { Cart } from '../classes/Cart.js';
import { PaymentProvider } from '../classes/PaymentProvider.js';
import { ShippingProvider } from '../classes/ShippingProvider.js';
import { TaxProvider } from '../classes/TaxProvider.js';

const SubmitOrder = ({cart, setCart, user, order, setOrder, points, setPoints}) => {

    const navigate = useNavigate();
    const [redeemPoints, setRedeemPoints] = useState(0);

    //const promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));

    const updateCartForProcessing = () => {
        let newCart = Cart.copyCart(cart);
        newCart.customerId = user.customerId;
        ShippingProvider.calculateShipping(newCart);
        TaxProvider.calcSalesTax(newCart);
        Cart.updateHeaderTotals(newCart);
        newCart.salesOrderTender.amount = newCart.grossAmount;
        console.log("New Cart: ", newCart);
        setCart(newCart);
    }

    async function postOrder(subCart) {
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/orders", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify(subCart),
            headers: { "Content-Type": "application/json" }
        });
        const newOrder = await response.json();
        return newOrder;
    }

    async function putPointRedemption() {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + cart.customerId + "/redeempoints/" + redeemPoints, {
        mode: "cors",
        method: "PUT"
      });
      const certificate = await response.json();
      return certificate;
    }

    async function fetchCustomerPointBalance() {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + cart.customerId + "/pointsbalance", {
        mode: "cors",
        method: "GET"
      });
      const pointsBalance = await response.json();
      return pointsBalance;
    }

    const processOrder = () => {
        let subCart = { ...cart };
        // Update date/time for submission
        subCart.date = new Date().toISOString();
        postOrder(subCart)
        .then( (newOrder) => {
            // Display confirmation with Order Id and points earned
            console.log("Order response: ", newOrder)
            //refreshPointsBalance();
            setCart(Cart.createCart());
            setOrder(newOrder);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const processRedemption = () => {
      let newCart = { ...cart };
      // redeem points, apply discount, setCart again
      putPointRedemption()
      .then( (rewardCertificate) => {
        console.log("Reward Certificate: ", rewardCertificate);
        let discount = rewardCertificate.dollarValue;
        Cart.applyDiscount(newCart, discount);
        // Re-calc taxes and totals
        TaxProvider.calcSalesTax(newCart);
        Cart.updateHeaderTotals(newCart);
        newCart.salesOrderTender.amount = newCart.grossAmount;
        setRedeemPoints(0);
        setCart(newCart);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }

    const refreshPointsBalance = () => {
      if (user) {
        fetchCustomerPointBalance()
        .then((pointsBalance) => {
          setPoints(parseInt(pointsBalance.pointsBalance));
        })
        .catch((err) => {
          console.log(err.message);
        })
      }
    }

    useEffect( () => {
        updateCartForProcessing();
    }, []);

    useEffect( () => {
      refreshPointsBalance();
    }, [cart]);

    useEffect(  () => {
        if (order) {
            navigate("/confirmation");
        }
    }, [order]);

    return (
        <div style={{margin: '0px 0px 0px 320px'}}>
          
          {/* Title */}
          <h1 style={{ display: 'flex', 
                      justifyContent: 'left', 
                      padding: '20px 0px 40px 0px',
                      fontSize: '42px'}}> 
          Submit Your Order
          </h1>
    
    
          {/* Line Break */}
          <h2 style={{fontSize: '22px'}}>Your Items</h2>
          <hr style={{ borderTop: '1px solid black'}}/>
    
          <div style={{padding: '0px 0px 20px 0px'}}>
            {cart.salesOrderDetails.map((detail, index) => {
              // render all the game cards
              return (
                <div>
                  <div><b>Item #{index + 1}</b></div>
                  {<img src={'../images/' + detail.productImg} alt="thumbnail" width="50px" />}
                  <div><b>Product Name:</b> {detail.productName} </div>
                  <div><b>Quantity:</b> {detail.quantity} </div>
                  <div><b>Unit Price:</b> ${detail.unitPrice.toFixed(2)} </div>
                  <div><b>Discount:</b> ${detail.lineDiscountAmount.toFixed(2)} </div>
                  <div><b>Item Total:</b> ${detail.lineNetAmount.toFixed(2)} </div>
                  <br></br><br></br>
                </div>
              );
            })}
    
          </div>
          {/* Line Break */}
          <h2 style={{fontSize: '22px'}}>Submit payment for:</h2>
          <hr style={{ borderTop: '1px solid black'}}/>
    
    
          {/* Access Order Total */}
          <div style={{padding: '0px 0px 20px 0px'}}>
            <div>+ Discounts: ${cart.discountAmount.toFixed(2)} </div>
            <div>+ Sub-Total: ${cart.netAmount.toFixed(2)} </div>
            <div>+ Shipping and Handling: ${cart.shippingAndHandling.toFixed(2)} </div>
            <div>+ Tax: ${cart.taxAmount.toFixed(2)}  </div>
            <br></br>
            {points > 0 &&
             <div>
              <div>You have <b>{points}</b> loyalty points available.  Would you like to redeem them for up to ${(points / 100.0).toFixed(2)}?</div><br></br>
              <div style={{display: "flex"}}>
                <div style={{width: "150px"}}><b>Points to Redeem:</b> </div>
                <div style={{width: "130px"}}>
                  <input type="text" value={redeemPoints} size={10} onChange={e => setRedeemPoints(Math.min(points, e.target.value, parseInt(cart.netAmount * 100)))}></input>
                </div>
                <Button type="submit" variant="contained" className="" color="secondary"
                  onClick={() => {
                    processRedemption();
                  }}
                >Apply</Button>
              </div>
             </div>
            }
            <br></br>
            <div>
              <h2 style={{fontSize: '32px'}}>
                Total: ${cart.grossAmount.toFixed(2)} 
              </h2>
            </div>
          </div>
    
    
          {/* Loyalty Points Prompt */}
          <div style={{padding: '20px 0px 20px 0px'}}>
            <div>You can earn <b>{parseInt(Math.round(cart.netAmount * 10))}</b> loyalty points with this purchase! <i>(10 points per dollar)</i></div>
          </div>
    
    
          {/* Checkout Button */}
          <Button type="submit" variant="contained" className="" color="secondary"
            onClick={() => {
                console.log("Tender: ", cart.salesOrderTender);
                // Mock payment processing
                PaymentProvider.Authorize(cart.salesOrderTender);
                PaymentProvider.Charge(cart.salesOrderTender);
                // Now submit the order to the loyalty system
                processOrder();          
            }}
          >
            Complete Checkout
          </Button>
          <br></br><br></br>
        </div>
      );

}

export default SubmitOrder;