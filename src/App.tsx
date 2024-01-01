import Cart from "#views/Cart/cart";
import Products from "#views/Products/products";
import SingleProduct from "#views/SingleProduct/single-product";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "./axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export type CartItem = {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
};

function App() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [addProduct, setAddProduct] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem("carts");
    if (!localData) {
      return [];
    }
    return JSON.parse(localData);
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(addProduct));
  }, [addProduct]);

  const addToCart = useCallback(
    async (productId: number) => {
      setIsLoading(true);
      try {
        const duplicateData = addProduct.find((cartitem) => {
          return cartitem.id === productId;
        });

        if (duplicateData) {
          const res = await axios.put("/carts/1", {
            products: [
              {
                id: duplicateData.id,
                quantity: duplicateData.quantity + 1,
              },
            ],
          });

          const newItem = addProduct.filter((cartitem) => {
            return cartitem.id !== duplicateData.id;
          });

          setAddProduct([...newItem, ...res.data.products]);

          alert("Updated the cart!");
        } else {
          const res = await axios.post<{ products: CartItem[] }>("/carts/add", {
            userId: 1,
            products: [
              {
                id: productId,
                quantity: 1,
              },
            ],
          });
          setAddProduct((prev) => [...prev, ...res.data.products]);
          alert("New Product added to cart!");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          // setIsError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [addProduct, setAddProduct]
  );

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Products
                  productsData={productsData}
                  setProductsData={setProductsData}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="carts/1"
              element={
                <Cart addProduct={addProduct} setAddProduct={setAddProduct} />
              }
            />

            <Route
              path="singleproducts/:productId"
              element={
                <SingleProduct addToCart={addToCart} isLoading={isLoading} />
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <h1>Page Under Construction</h1>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
