import Navbar from "./components/navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Browse from "./pages/browse";
import Contact from "./pages/contact";
import ShoppingCart from "./pages/shoppingCart";
import ShippingAndPayment from "./pages/shippingAndPayment";
import SubmitOrder from "./pages/submitOrder";
import OrderConfirmation from "./pages/orderConfirmation";
import Profile from "./pages/profile";
import SignIn from "./pages/signin";
import Loyalty from "./pages/loyalty"
import Game from "./pages/game";
import { Cart } from './classes/Cart.js';

// import './App.css';

// Launch the app
function App() {

  let [cart, setCart] = useState(Cart.createCart());
  // Just for order confirmation page
  let [order, setOrder] = useState(null);
  let [user, setUser] = useState(null);
  let [points, setPoints] = useState(0);

  return (
    <Router>
      <Navbar cart={cart} points={points} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/browse" element={<Browse />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/shoppingCart" element={<ShoppingCart cart={cart} setCart={setCart} user={user} setOrder={setOrder} />} />
        <Route exact path="/payment" element={<ShippingAndPayment cart={cart} setCart={setCart} user={user} setUser={setUser} />} />
        <Route exact path="/submitOrder" element={<SubmitOrder cart={cart} setCart={setCart} user={user} order={order} setOrder={setOrder} points={points} setPoints={setPoints} />} />
        <Route exact path="/confirmation" element={<OrderConfirmation user={user} order={order} setOrder={setOrder} setPoints={setPoints} />} />
        <Route exact path="/profile" element={<Profile user={user} setPoints={setPoints} />} />
        <Route exact path="/signin" element={<SignIn user={user} setUser={setUser} />} />
        <Route exact path="/game" element={<Game cart={cart} setCart={setCart} />} />
        <Route exact path="/loyalty" element={<Loyalty user={user} points={points} />} />
      </Routes>
    </Router>
  );
}

export default App;
