import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Cart } from '../classes/Cart.js';

export default function Game({cart, setCart}) {
  const location = useLocation();
  const game = location.state.game;
  const [quantity, setQuantity] = React.useState(1);
  const capitalizeFirstLetter = (string) => {
    const str = string.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleQuantityChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Link to="/browse">
        <a>
          <h2 style={{ top: "30px", position: "absolute", left: "100px" }}>
            Back to Products
          </h2>
        </a>
      </Link>
      <h1 style={{ top: "50px", position: "absolute", left: "100px" }}>
        {game.name}
      </h1>
      <img
        src={`./images/${game.imageUrl}`}
        style={{
          left: "100px",
          position: "absolute",
          width: "50vh",
          top: "130px",
          cursor: "zoom-in",
        }}
      />
      <img
        src={`./images/screenshots/${game.screenshot1}`}
        style={{
          right: "50px",
          position: "absolute",
          top: "55vh",
          height: "300px",
          cursor: "zoom-in",
        }}
        onClick={(e) => {
          if (e.currentTarget.style.height === "350px") {
            e.currentTarget.style.height = "300px";
            e.currentTarget.style.cursor = "zoom-in";
          } else {
            e.currentTarget.style.height = "350px";
            e.currentTarget.style.cursor = "zoom-out";
          }
        }}
      />
      <img
        src={`./images/screenshots/${game.screenshot2}`}
        style={{
          right: "50px",
          position: "absolute",
          top: "70px",
          height: "300px",
          cursor: "zoom-in",
        }}
        onClick={(e) => {
          if (e.currentTarget.style.height === "350px") {
            e.currentTarget.style.height = "300px";
            e.currentTarget.style.cursor = "zoom-in";
          } else {
            e.currentTarget.style.height = "350px";
            e.currentTarget.style.cursor = "zoom-out";
          }
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: "700", color: "#363636" }}>
          Product Code:{" "}
          <span style={{ fontWeight: "400", color: "#4a4a4a" }}>
            {game.code}
          </span>
        </div>
        <div style={{ fontWeight: "700", color: "#363636" }}>
          Description:{" "}
          <span style={{ fontWeight: "400", color: "#4a4a4a" }}>
            {game.description}
          </span>
        </div>
        <div style={{ fontWeight: "700", color: "#363636" }}>
          System:{" "}
          <span style={{ fontWeight: "400", color: "#4a4a4a" }}>
            {capitalizeFirstLetter(game.codeBrand)} {game.level1}
          </span>
        </div>
        <div style={{ fontWeight: "700", color: "#363636" }}>
          Genre:{" "}
          <span style={{ fontWeight: "400", color: "#4a4a4a" }}>
            {capitalizeFirstLetter(game.level2)} Games
          </span>
        </div>
        <div style={{ fontWeight: "700", color: "#363636" }}>
          Price:{" "}
          <span style={{ fontWeight: "400", color: "#4a4a4a" }}>
            {`$${game.unitPrice}`}
          </span>
        </div>

        <div class="field is-horizontal" style={{ paddingTop: "5px" }}>
          <div class="field-label is-normal">
            <label class="label">Quantity: </label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="number"
                  defaultValue="1"
                  value={quantity}
                  placeholder="Quantity"
                  min="1"
                  onChange={handleQuantityChange}
                  onInput={(e) => {
                    e.target.value = Math.max(
                      0,
                      parseInt(e.target.value)
                    ).toString();
                  }}
                  style={{ marginLeft: "-15px", height: "35px" }}
                />
              </p>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button
            class="button is-primary"
            style={{ backgroundColor: "#7b1fa2" }}
            onClick={() => {
              let newCart = Cart.copyCart(cart);
              Cart.addLineItem(newCart, game.code, game.description, game.imageUrl, parseFloat(game.unitPrice), parseInt(quantity), 0.0);
              //console.log("Added item to cart: ", game.code);
              //console.log(newCart);
              setCart(newCart);
              alert(game.description + " added to your cart.");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
