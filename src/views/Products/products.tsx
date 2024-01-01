import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Container from "#views/Container/container";

import axios from "../../axios";
import "./products.css";

import ProductItem from "#views/ProductItem/productitem";

import { Product } from "../../App";

interface ProductProps {
  productsData: Product[];
  setProductsData: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (id: number) => void;
}

function Products({ productsData, setProductsData, addToCart }: ProductProps) {
  const [isError, setIsError] = useState<string>("");

  const getProductData = useCallback(async () => {
    try {
      const res = await axios.get<{ products: Product[] }>("/products");
      setProductsData(res.data.products);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError("An unknown error occurred.");
      }
    }
  }, [setProductsData]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  const navigate = useNavigate();

  const handleDetails = (productId: number) =>
    navigate(`/singleproducts/${productId}`);

  return (
    <>
      <Container>
        {isError !== "" && <h2>{isError}</h2>}

        <div className="grid">
          {productsData.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              handleDetails={handleDetails}
              addToCart={addToCart}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Products;
