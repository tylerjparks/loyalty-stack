import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css/main.css";
import {Button} from "@mui/material";

const OrderConfirmation = ({user, order, setOrder, setPoints}) => {

    const navigate = useNavigate();

    console.log("Order confirmation for: ", order);

    async function fetchCustomerPointBalance() {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + order.customerId + "/pointsbalance", {
        mode: "cors",
        method: "GET"
      });
      const pointsBalance = await response.json();
      return pointsBalance;
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

    useEffect(() => {
      refreshPointsBalance();
    }, []);

    useEffect( () => {
        console.log("useEffect Order confirmation for: ", order);
    }, [order]);

    return (
        <div style={{margin: '0px 0px 0px 320px'}}>
          
          {/* Title */}
          <h1 style={{ display: 'flex', 
                      justifyContent: 'left', 
                      padding: '20px 0px 40px 0px',
                      fontSize: '42px'}}> 
          Order Confirmation
          </h1>

           {/* Accessing Order Information */}
            <div>Order ID: {order.id} </div>
    
    
          {/* Line Break */}
          <h2 style={{fontSize: '22px'}}>Your Items</h2>
          <hr style={{ borderTop: '1px solid black'}}/>
    
          <div style={{padding: '0px 0px 20px 0px'}}>
            {order.salesOrderDetails.map((detail, index) => {
              // render all the game cards
              return (
                <div>
                  <div><b>Item #{index + 1}</b></div>
                  <div>Product Name: {detail.productName} </div>
                  <div>Quantity: {detail.quantity} </div>
                  <div>Unit Price: ${detail.unitPrice.toFixed(2)} </div>
                  <div>Item Total: ${detail.lineNetAmount.toFixed(2)} </div>
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
            <div>+ Sub-Total: ${order.netAmount.toFixed(2)} </div>
            <div>+ Shipping and Handling: ${order.shippingAndHandling.toFixed(2)} </div>
            <div>+ Tax: ${order.taxAmount.toFixed(2)}  </div>
            <div>
              <h2 style={{fontSize: '32px'}}>
                Total: ${order.grossAmount.toFixed(2)} 
              </h2>
            </div>
          </div>
    
    
          {/* Loyalty Points Prompt */}
          <div style={{padding: '20px 0px 20px 0px'}}>
            <div><b>You earned loyalty points with this purchase!</b></div>
            {order.points && order.points.length > 0 &&
                order.points.map((pointRecord, index) => {
                  return (
                    <div style={{display: "flex"}}>
                      <div style={{width: "150px"}}>{pointRecord.bonusCode}</div>
                      <div style={{width: "150px"}}>{pointRecord.amount} points</div>
                    </div>
                  );
                })
            }
          </div>
    
    
          {/* Checkout Button */}
          <Button type="submit" variant="contained" className="" color="secondary"
            onClick={() => {
                 navigate("/browse");
            }}
          >
            Continue Shopping
          </Button>
          <br></br><br></br>
        </div>
      );
}

export default OrderConfirmation;