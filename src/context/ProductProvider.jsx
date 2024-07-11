import { createContext, useEffect, useState } from "react";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [focusItem, setFocusItem] = useState({});
  const [loading, setLoading] = useState(false);
  const api = "https://dummyjson.com/products/category/";

  const electronicsCategories = [
    "laptops",
    "smartphones",
    "tablets",
    "mobile-accessories",
  ];

  const clothesAndCosmetics = [
    "mens-shirts",
    "womens-dresses",
    "mens-shoes",
    "mens-watches",
    "tops",
    "womens-bags",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "skin-care",
    "beauty",
    "fragrances",
  ];

  const [currentCategories, setCurrentCategories] = useState("electronics");

  const subTotal = cartItem.reduce((total, item) => {
    return total + parseFloat(item.price);
  }, 0);
  const cartItemCount = cartItem.length;

  async function fetchProduct() {
    if (currentCategories === "electronics") {
      setLoading(true);
      const allProducts = [];
      try {
        for (const cat of electronicsCategories) {
          const req = await fetch(api + cat);
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
          const req = await fetch(api + cat);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
