import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Button, Select} from "@mui/material";

// Loyalty page

const Loyalty = ({user, points}) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [pointHistory, setPointHistory] = useState(null);

  // fetch function to retrieve loyalty bonus data
  const fetchCustomer = (custId) => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + custId, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((customerData) => {
        setCustomer(customerData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  async function fetchCustomerPointsHistory() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + customer.id + "/pointshistory", {
      mode: "cors",
      method: "GET",
    });
    const pointHist = await response.json();
    return pointHist;
  }

  const retrievePointHistory = () => {
    if (customer) {
      fetchCustomerPointsHistory()
      .then((pointHistory) => {
        setPointHistory(pointHistory);
      })
      .catch((err) => {
        console.log(err.message);
      })
    }
  }

  useEffect(() => {
    if (!user) {
      //alert("Please sign in.");
      navigate("/signin");
    }
    else {
      fetchCustomer(user.customerId);
    }
  }, []);

  useEffect(() => {
    if (customer) {
      if (customer.enrollment && customer.enrollment.status === 'A') {
        retrievePointHistory();
      }
      else {
        // Non-enrolled customer
        navigate("/profile");
      }
    }
  }, [customer]);

  /*useEffect(() => {
    if (pointHistory) {
      console.log("Points history state:", pointHistory);
      console.log("Point history length: ", pointHistory.length);
    }
  }, [pointHistory]);*/

  return (
    <div style={{margin: '0px 0px 0px 320px'}}>
      
      {/* Title */}
      <h1 style={{ display: 'flex', 
                  justifyContent: 'left', 
                  padding: '20px 0px 40px 0px',
                  fontSize: '42px'}}> 
      Loyalty Status
      </h1>

      {/* Line Break */}
      {customer && customer.enrollment && customer.enrollment.status === 'A' &&
        <h2 style={{fontSize: '22px'}}>Your Loyalty Account Number: {customer.enrollment.accountNumber}</h2>
      }
      <h2 style={{fontSize: '22px'}}>Your Point Balance: {points}</h2>
      <hr style={{ borderTop: '1px solid black'}}/>
      <br></br>
      <h2 style={{fontSize: '22px'}}>Points History:</h2>
      <br></br>
          {pointHistory && 
            pointHistory.map((pointRecord, index) => {
              return (
                <div style={{display: "flex"}}>
                  <div style={{width: "250px"}}><b>Activity Type: </b> {pointRecord.activityType}</div>
                  <div style={{width: "180px"}}><b>Points Amount: </b> {pointRecord.amount}</div>
                  {pointRecord.bonusCode && <div style={{width: "300px"}}><b>Bonus Code: </b>{pointRecord.bonusCode}</div>}
                  {pointRecord.redemptionCode && <div style={{width: "300px"}}><b>Redemption Code: </b>{pointRecord.redemptionCode}</div>}
                  <div style={{width: "300px"}}><b>Date: </b>{pointRecord.date}</div>
                </div>
              );
            })
          }

    </div>
  )
}

export default Loyalty