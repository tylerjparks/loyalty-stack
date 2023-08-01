import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css/main.css";
import {Button, Select} from "@mui/material";
import { Cart } from '../classes/Cart.js';

const ShippingAndPayment = ({cart, setCart, user, setUser}) => {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const tenderOptions = [
        { label: 'MasterCard', value: 'MC '},
        { label: 'Visa', value: 'VI' }
    ];
    const [tenderCode, setTenderCode] = useState('MC');

    const handleChange = (e) => {
        setTenderCode(e.target.value);
    }

    async function fetchCustomer(custId) {
        const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/api/customers/" + custId, {
            mode: "cors",
            method: "GET"
        });
        const custData = await response.json();
        return custData;
    }

    const getCustomer = () => {
        //console.log("User: ", user);
        let custId = user.customerId;
        //console.log("Getting customer for id: ", custId);
        fetchCustomer(custId)
        .then( (custData) => {
            //console.log("Customer data object: ", custData);
            setCustomer(custData);
        })
        .catch( (err) => {
            console.log(err.message);
        });
    }

    useEffect( () => {
        if (customer) {
            //console.log("Customer: ", customer);
            let newCart = Cart.copyCart(cart);
            Cart.setShippingAddress(newCart, customer.firstName, customer.lastName, customer.address, customer.city, customer.state, customer.country, customer.postal);
            //console.log("New Cart: ", newCart);
            setCart(newCart);
            //console.log("Updated cart: ", cart);
        }
    }, [customer]);

    const setFirstName = (firstName) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.firstName = firstName;
        setCart(newCart);
    }

    const setLastName = (lastName) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.lastName = lastName;
        setCart(newCart);
    }

    const setAddress = (address) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.address = address;
        setCart(newCart);
    }

    const setCity = (city) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.city = city;
        setCart(newCart);
    }

    const setState = (state) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.state = state;
        setCart(newCart);
    }

    const setCountry = (country) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.country = country;
        setCart(newCart);
    }

    const setPostal = (postal) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderShippingAddress.postal = postal;
        setCart(newCart);
    }

    const setPaymentCardNumber = (cardNumber) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderTender.paymentCardNumber = cardNumber;
        setCart(newCart);
    }

    const setPaymentFirstName = (firstName) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderTender.paymentCardFirstName = firstName;
        setCart(newCart);
    }

    const setPaymentLastName = (lastName) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderTender.paymentCardLastName = lastName;
        setCart(newCart);
    }

    const setPaymentZip = (zip) => {
        let newCart = Cart.copyCart(cart);
        newCart.salesOrderTender.paymentCardZip = zip;
        setCart(newCart);
    }

    useEffect(() => {
        getCustomer();
      }, [user]);

    return (
        <div style={{margin: '0px 0px 0px 320px'}}>
            {/* Title */}
            <h1 style={{ display: 'flex', 
                  justifyContent: 'left', 
                  padding: '20px 0px 40px 0px',
                  fontSize: '22px'}}> 
            Shipping Address
            </h1>

            <div>First Name:</div>
            <input value={cart.salesOrderShippingAddress.firstName} size={50} onChange={e => setFirstName(e.target.value)}></input>
            <div>Last Name:</div>
            <input value={cart.salesOrderShippingAddress.lastName} size={50} onChange={e => setLastName(e.target.value)}></input>
            <div>Address: </div>
            <input value={cart.salesOrderShippingAddress.address} size={50} onChange={e => setAddress(e.target.value)}></input>
            <div>City:</div>
            <input value={cart.salesOrderShippingAddress.city} size={50} onChange={e => setCity(e.target.value)}></input>
            <div>State:</div>
            <input value={cart.salesOrderShippingAddress.state} size={50} onChange={e => setState(e.target.value)}></input>
            <div>Country:</div>
            <input value={cart.salesOrderShippingAddress.country} size={50} onChange={e => setCountry(e.target.value)}></input>
            <div>Postal:</div>
            <input value={cart.salesOrderShippingAddress.postal} size={50} onChange={e => setPostal(e.target.value)}></input>
            <br></br><br></br>

            {/* Line Break */}
            <h2 style={{fontSize: '22px'}}>Payment Details: </h2>
            <hr style={{ borderTop: '1px solid black'}}/>

            <div>
                <label>
                    {"Payment Type:  "}
                    <select value={tenderCode} onChange={handleChange}>
                        {tenderOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>Card Number:</div>
            <input value={cart.salesOrderTender.paymentCardNumber} size={50} onChange={e => setPaymentCardNumber(e.target.value)}></input>
            <div>Cardholder First Name:</div>
            <input value={cart.salesOrderTender.paymentCardFirstName} size={50} onChange={e=> setPaymentFirstName(e.target.value)}></input>
            <div>Cardholder Last Name:</div>
            <input value={cart.salesOrderTender.paymentCardLastName} size={50} onChange={e => setPaymentLastName(e.target.value)}></input>
            <div>Cardholder Zip:</div>
            <input value={cart.salesOrderTender.paymentCardZip} size={50} onChange={e => setPaymentZip(e.target.value)}></input>
            <div><br></br></div>

            {/* Checkout Button */}
            <Button type="submit" variant="contained" className="" color="secondary"
                onClick={() => {
                    // Update tender and navigate to Submit order
                    let newCart = Cart.copyCart(cart);
                    cart.salesOrderTender.codeTender = tenderCode;
                    setCart(newCart);
                    navigate("/submitOrder");
                }}
            >
                Continue
            </Button>

            <br></br><br></br>
        </div>

    );

}

export default ShippingAndPayment;