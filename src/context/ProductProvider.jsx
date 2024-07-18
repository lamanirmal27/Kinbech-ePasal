import { createContext, useEffect, useRef, useState } from "react";
import newItem from "./itemData";
const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [item, setItem] = useState([]);
  const fashionRef = useRef(null);
  const electoRef = useRef(null);
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [focusItem, setFocusItem] = useState(() => {
    const focused = sessionStorage.getItem("focus");
    return focused ? JSON.parse(focused) : [];
  });
  const [loading, setLoading] = useState(false);
  const api = "https://dummyjson.com/products/category";

  const handleRemoveCartItem = (productId) => {
    setCartItem((prevCartItem) =>
      prevCartItem.filter((item) => item.id !== productId)
    );
  };

  // const scrollToFashion = () => {
  //   fashionRef.current.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };
  const scrollToFashion = () => {
    const yOffset = -100; // Adjust this value as needed
    const element = fashionRef.current;
    const y = element.getBoundingClientRect().top + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToElectronics = () => {
    const yOffset = -120; // Adjust this value as needed
    const element = electoRef.current;
    const y = element.getBoundingClientRect().top + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    console.log(item);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    sessionStorage.setItem("focus", JSON.stringify(focusItem));
  }, [focusItem]);

  const electronicsCategories = [
    "laptops",
    "smartphones",
    "tablets",
    "mobile-accessories",
  ];

  const clothesAndCosmetics = [
    "mens-shoes",
    "mens-watches",

    "womens-shoes",
    "womens-watches",
  ];

  const [currentCategories, setCurrentCategories] = useState("electronics");

  const subTotal = cartItem
    .reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0.0)
    .toFixed(2);
  const cartItemCount = cartItem.length;

  async function fetchProduct() {
    if (currentCategories === "electronics") {
      setLoading(true);
      const allProducts = [];
      try {
        for (const cat of electronicsCategories) {
          const req = await fetch(`${api}/${cat}/?limit=2`);
          const response = await req.json();
          if (response?.products) {
            allProducts.push(...response.products);
          }
        }
        setItem(allProducts);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    } else if (currentCategories === "clothes") {
      setLoading(true);
      const allProducts = [];
      try {
        for (const cat of clothesAndCosmetics) {
          const req = await fetch(`${api}/${cat}/limit=2`);
          const response = await req.json();
          if (response?.products) {
            allProducts.push(...response.products);
          }
        }
        setItem(allProducts);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [currentCategories]);
  return (
    <ProductContext.Provider
      value={{
        fashionRef,
        electoRef,
        item,
        setItem,
        focusItem,
        setFocusItem,
        loading,
        setLoading,
        fetchProduct,
        currentCategories,
        setCurrentCategories,
        isCartOpen,
        setIsCartOpen,
        cartItem,
        setCartItem,
        subTotal,
        cartItemCount,
        handleRemoveCartItem,
        newItem,
        scrollToElectronics,
        scrollToFashion,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
