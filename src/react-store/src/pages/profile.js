import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Button, Select} from "@mui/material";

// Profile page

const Profile = ({user, setPoints}) => {

  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState("");

  // fetch function to retrieve customer data
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

  async function postCustomer(newCustomer) {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + newCustomer.id, {
        mode: "cors",
        method: "PUT",
        body: JSON.stringify(newCustomer),
        headers: { "Content-Type": "application/json" }
    });
    const updatedCustomer = await response.json();
    return updatedCustomer;
  }

  async function fetchCustomerOrders() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + customer.id + "/orders", {
      mode: "cors",
      method: "GET",
    });
    const custOrders = await response.json();
    return custOrders;
  }

  async function fetchCustomerPointBalance() {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + customer.id + "/pointsbalance", {
      mode: "cors",
      method: "GET"
    });
    const pointsBalance = await response.json();
    return pointsBalance;
  }

  const saveCustomer = () => {
    if (customer) {
      let newCustomer = { ...customer };
      newCustomer.firstName = firstName;
      newCustomer.lastName = lastName;
      newCustomer.emailAddress = emailAddress;
      newCustomer.phone = phone;
      newCustomer.address = address;
      newCustomer.city = city;
      newCustomer.country = country;
      newCustomer.state = state;
      newCustomer.postal = postal;
      console.log("Customer to save: ", newCustomer);
      postCustomer(newCustomer)
      .then( (udpatedCustomer) => {
        console.log("Customer response: ", udpatedCustomer)
        setCustomer(udpatedCustomer);
        alert("Profile changes saved.");
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }

  const retrieveOrders = () => {
    if (customer) {
      fetchCustomerOrders()
      .then((custOrders) => {
        console.log("Cust orders: ", custOrders);
        setOrders(custOrders);
      }) 
      .catch((err) => {
        console.log(err.message);
      });
    }
  }

  const retrievePointsBalance = () => {
    if (customer) {
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
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmailAddress(customer.emailAddress);
      setPhone(customer.phone);
      setAddress(customer.address);
      setCity(customer.city);
      setCountry(customer.country);
      setState(customer.state);
      setPostal(customer.postal);
    }
  }, [customer]);

  useEffect(() => {
    if (customer && !orders) {
      console.log("Retrieving orders...");
      retrieveOrders();
    }
  }, [customer, orders]);

  useEffect(() => {
    if (customer) {
      retrievePointsBalance();
    }
  }, [customer]);

  return (
    <div style={{margin: '0px 0px 0px 320px'}}>
      
      {/* Title */}
      <h1 style={{ display: 'flex', 
                  justifyContent: 'left', 
                  padding: '20px 0px 40px 0px',
                  fontSize: '42px'}}> 
      Profile
      </h1>

      {/* Line Break */}
      <hr style={{ borderTop: '1px solid black'}}/>

      <div>First Name:</div>
      <input value={firstName} size={50} onChange={e => setFirstName(e.target.value)}></input>
      <div>Last Name:</div>
      <input value={lastName} size={50} onChange={e => setLastName(e.target.value)}></input>
      <div>Email: </div>
      <input value={emailAddress} size={50} onChange={e => setEmailAddress(e.target.value)}></input>
      <div>Phone: </div>
      <input value={phone} size={50} onChange={e => setPhone(e.target.value)}></input>
      <div>Address: </div>
      <input value={address} size={50} onChange={e => setAddress(e.target.value)}></input>
      <div>City:</div>
      <input value={city} size={50} onChange={e => setCity(e.target.value)}></input>
      <div>State:</div>
      <input value={state} size={50} onChange={e => setState(e.target.value)}></input>
      <div>Country:</div>
      <input value={country} size={50} onChange={e => setCountry(e.target.value)}></input>
      <div>Postal:</div>
      <input value={postal} size={50} onChange={e => setPostal(e.target.value)}></input>
      <br></br><br></br>

      {/* Save Button */}
      <Button type="submit" variant="contained" className="" color="secondary"
            onClick={() => {
              saveCustomer();
            }}
      >
        Save Changes
      </Button>

      <br></br><br></br>
      <h2 style={{fontSize: '22px'}}>Order History:</h2>
      <hr style={{ borderTop: '1px solid black'}}/>

          {orders && orders.length > 0 &&
            orders.map((nextOrder, index) => {
              return (
                <div style={{display: "flex"}}>
                  <div style={{width: "150px"}}><b>Order ID:</b> {nextOrder.id}</div>
                  <div style={{width: "300px"}}><b>Date:</b> {nextOrder.date}</div>
                  <div style={{width: "150px"}}><b>Total:</b> ${nextOrder.grossAmount.toFixed(2)}</div>
                </div>
              );
            })
          }

    </div>
  )
}

export default Profile