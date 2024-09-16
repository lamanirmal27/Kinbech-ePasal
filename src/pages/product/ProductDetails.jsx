import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import UserContext from "../../context/UserProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

export default function Detials() {
  const {
    focusItem,
    setCartItem,
    handleAddtoCart,
    quantity,
    setQuantity,
    updateQuantity,
  } = useContext(ProductContext);
  const { isLoggedIn } = useContext(UserContext);
  const [activeImg, setActiveImage] = useState(focusItem?.images?.[0]?.src);
  const navigate = useNavigate();

  useEffect(() => {
    // setActiveImage(focusItem?.images?.[0]?.src);
  }, [focusItem, activeImg]);

  return (
    <div className="bg-white mt-0 p-20">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="flex flex-col justify-evenly lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row  h-24">
              <img
                src={focusItem?.images?.[0]?.src}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(focusItem?.images?.[0]?.src)}
              />
              <img
                src={focusItem?.images?.[1]?.src}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(focusItem?.images?.[1]?.src)}
              />
              <img
                src={focusItem?.images?.[2]?.src}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(focusItem?.images?.[2]?.src)}
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <h1 className="text-3xl font-bold">{focusItem?.name}</h1>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-2">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {focusItem?.highlights?.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{focusItem.details}</p>
              </div>
            </div>
            <h6 className="text-2xl font-semibold">Rs. {focusItem?.price}</h6>
            <div>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                className="w-12 text-center ml-5"
              />
            </div>
            <div className="flex flex-row items-center gap-12">
              <button
                onClick={(e) => {
                  isLoggedIn
                    ? (e.preventDefault(),
                      handleAddtoCart(focusItem),
                      updateQuantity(focusItem.id, quantity))
                    : (e.preventDefault(),
                      toast.error("Your need to login first"));
                }}
                className="bg-orange-600 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  isLoggedIn
                    ? (e.preventDefault(),
                      handleAddtoCart(focusItem),
                      updateQuantity(focusItem.id, quantity),
                      navigate("/checkout"))
                    : (e.preventDefault(),
                      toast.error("Your need to login first"));
                }}
                className="bg-green-600 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Buy now!!
              </button>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
}
