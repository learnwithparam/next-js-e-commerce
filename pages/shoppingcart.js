import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import EmptyState from "../components/ui/emptystate";

const Shoppingcart = () => {
  const [haveProducts, setHaveProducts] = useState(false);
  const shoppingCartList = useSelector(
    (state) => state.shoppingCart.shoppingCart
  );

  useEffect(() => {
    if (shoppingCartList == null) {
      setHaveProducts(false);
    } else {
      setHaveProducts(true);
    }
  }, []);

  console.log("shoppingcart", shoppingCartList);
  return (
    <div>
      <h3 className="text-gray-700 text-center text-5xl font-semibold mb-8">
        Shopping Cart
      </h3>
      {haveProducts ? (
        <div className=" w-10/12 gap-2 ml-auto mr-auto mt-12 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
          {shoppingCartList.map((i, index) => (
            <ul key={index} className="flex flex-row mb-4">
              <Image src={i.image} height={90} width={100} />
              <div className="ml-6">
                <li>
                  <strong className="pr-2">Name:</strong>
                  {i.name}
                </li>
                <li>
                  <strong className="pr-2">Price:</strong>${i.price}
                </li>
                <li>
                  <strong className="pr-2">Size:</strong>
                  {i.size}
                </li>
              </div>
            </ul>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Shoppingcart;
