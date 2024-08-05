import Dessert from "./Dessert";

import { useGlobalContext } from "../context";

const DessertList = () => {
  const { productData } = useGlobalContext();
  return (
    <div>
      <h1 className="font-bold text-lg">Desserts</h1>
      <div className="grid grid-cols-3 gap-6 mt-7">
        {productData &&
          productData.map((dessert) => {
            return <Dessert key={dessert.id} {...dessert} />;
          })}
      </div>
    </div>
  );
};
export default DessertList;
