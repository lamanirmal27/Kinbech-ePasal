import { createContext, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
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
  const [quantity, setQuantity] = useState(1);
  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/product");
        setNewItem(response.data);
      } catch (err) {
        console.error("Error fetching the products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {}, [cartItem]);

  const handleAddtoCart = (item) => {
    setCartItem((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        // Item already in cart, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Item not in cart, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, new_quantity) => {
    setCartItem((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity: quantity > 0 ? quantity : 1 } // Prevents quantity from being less than 1
          : cartItem
      )
    );
    setQuantity(1);
  };

  const handleRemoveCartItem = (productId) => {
    setCartItem((prevCartItem) =>
      prevCartItem.filter((item) => item._id !== productId)
    );
  };

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

  const [currentCategories, setCurrentCategories] = useState("electronics");

  const subTotal = cartItem
    .reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0.0)
    .toFixed(2);
  const cartItemCount = cartItem.length;

  return (
    <ProductContext.Provider
      value={{
        fashionRef,
        electoRef,
        setItem,
        focusItem,
        setFocusItem,
        loading,
        setLoading,
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
        handleAddtoCart,
        updateQuantity,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
