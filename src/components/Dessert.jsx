/* eslint-disable react/prop-types */

import { useGlobalContext } from "../context";

import decrementButton from "../assets/images/icon-decrement-quantity.svg";
import incrementButton from "../assets/images/icon-increment-quantity.svg";

const Dessert = ({ id, category, image, name, price, cartCount }) => {
  const { addToCart, decrementQuantity } = useGlobalContext();
  return (
    <div className="flex-col">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-52 h-40 rounded-md" />
        <div
          className={
            cartCount != 0
              ? " bg-red-700 absolute bottom-3 left-10 w-32 h-10 text-red-800 text-center rounded-full border-2 border-red-800 cursor-pointer"
              : "absolute bottom-3 left-10 w-32 h-10 bg-white text-red-800 text-center rounded-full border-2 border-red-800 cursor-pointer"
          }
        >
          {/* ICON */}
          {cartCount == 0 ? (
            <h2 className="mt-1" onClick={() => addToCart(id)}>
              Add to Cart
            </h2>
          ) : (
            <div className="flex justify-evenly mt-1">
              <img
                src={decrementButton}
                alt="decrementQuantity"
                onClick={() => decrementQuantity(id)}
              />
              <h1 className="text-white">{cartCount}</h1>
              <img
                src={incrementButton}
                alt="incrementQuantity"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <h4>{category}</h4>
        <h3>{name}</h3>
        <h4>{price}</h4>
      </div>
    </div>
  );
};
export default Dessert;
