import emptyCart from "../assets/images/illustration-empty-cart.svg";
import removeItem from "../assets/images/icon-remove-item.svg";
import { useGlobalContext } from "../context";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cart, removeFromCart, toggleConfirmOrder } = useGlobalContext();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const total = cart.reduce((acc, dessert) => {
      return acc + dessert.cartCount * dessert.price;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="bg-white w-1/4 p-5 rounded-sm">
      <h1 className="font-bold text-red-900">Your Cart({cart.length})</h1>
      <div>
        {cart.length >= 1 ? (
          <div>
            {cart.map((dessert) => {
              const { id, name, price, subTotal } = dessert;
              return (
                <div
                  key={id}
                  className="flex justify-between items-center border-b mt-3"
                >
                  <div>
                    <div>
                      <h1>{name}</h1>
                      <div className="flex">
                        <p className="font-bold text-red-800 text-sm">
                          {dessert.cartCount}X
                        </p>
                        <p className="font-light text-red-900 ml-5">
                          @ ${price}
                        </p>
                        <p className="font-bold text-red-900 ml-5">
                          @ ${subTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <img
                      src={removeItem}
                      alt="removeItem"
                      onClick={() => removeFromCart(id)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="w-full flex justify-between mt-5">
              <h1>Order Total</h1>
              <h1>${totalPrice}</h1>
            </div>
            <button
              className="bg-red-900 text-white rounded-md ml-28 p-2"
              onClick={() => {
                toggleConfirmOrder();
              }}
            >
              Confirm order
            </button>
          </div>
        ) : (
          <div>
            <img src={emptyCart} alt="emptyCart" />
            <h1 className="font-bold text-red-900">
              Your added items will appear here
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
