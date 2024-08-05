import Cart from "./components/Cart";
import ConfirmOrder from "./components/ConfirmOrder";
import DessertList from "./components/DessertList";
import { useGlobalContext } from "./context";

const App = () => {
  const { showConfirmOrder } = useGlobalContext();
  return (
    <div className="relative">
      <div className={showConfirmOrder ? "opacity-25" : "bg-red-50 pt-5"}>
        <div className="flex justify-evenly items-baseline">
          <DessertList />
          <Cart />
        </div>
      </div>
      {showConfirmOrder && (
        <div
          className={
            showConfirmOrder && "z-10 drop-shadow-2xl absolute top-52 left-1/3"
          }
        >
          <ConfirmOrder />
        </div>
      )}
    </div>
  );
};
export default App;
