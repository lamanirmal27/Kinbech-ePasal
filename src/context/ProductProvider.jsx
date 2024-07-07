import { createContext, useEffect, useState } from "react";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [item, setItem] = useState([]);
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
    "beauty",
    "fragrances",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "skin-care",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  const [currentCategories, setCurrentCategories] = useState("electronics");

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
