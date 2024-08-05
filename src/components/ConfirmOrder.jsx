import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const ConfirmOrder = () => {
  const { cart, toggleConfirmOrder, setCart, productData, setProductData } =
    useGlobalContext();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const total = cart.reduce((acc, dessert) => {
      return acc + dessert.cartCount * dessert.price;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleProductData = () => {
    const newData = productData.map((product) => {
      product.cartCount = 0;
    });
    setProductData[newData];
  };
  return (
    <div className="w-96 bg-white p-5 rounded-sm">
      <h1>Order Confirmed</h1>
      <p>we hope you enjoyed your food</p>
      <div>
        {cart.map((item) => {
          const { id, image, name, price, cartCount, subTotal } = item;
          return (
            <div key={id} className="flex">
              <div>
                <img src={image} alt={name} className="w-11 h-11" />
              </div>
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <h1>{name}</h1>
                  <div className="flex">
                    <p className="font-bold text-red-800 text-sm">
                      {cartCount}X
                    </p>
                    <p className="font-light text-red-900 ml-5">@ ${price}</p>
                  </div>
                </div>
                <p className="font-bold text-red-900 ml-5">${subTotal}</p>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between">
          <h1>Order Total</h1>
          <h1>${totalPrice}</h1>
        </div>
      </div>
      <button
        className="px-10 py-1 bg-red-600 rounded-full text-white font-semibold ml-20"
        onClick={() => {
          toggleConfirmOrder();
          setCart([]);
          handleProductData();
        }}
      >
        Start New Order
      </button>
    </div>
  );
};
export default ConfirmOrder;
