import axios from "../../axios";
import Container from "#views/Container/container";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./single-product.css";

import StarRatings from "react-star-ratings";

interface SingleProductInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  discountPercentage: number;
}

interface ProductSingleProps {
  addToCart: (id: number) => void;
  isLoading: boolean;
  // handleAddToCart: (id: number) => void;
}

function SingleProduct({ addToCart, isLoading }: ProductSingleProps) {
  const { productId } = useParams<{ productId: string }>();
  const [singleProduct, setSingleProduct] = useState<SingleProductInterface>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    discountedPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    discountPercentage: 0,
  });
  const [isError, setIsError] = useState<string>("");

  const getSingleProduct = useCallback(async () => {
    try {
      const res = await axios.get(`/products/${productId}`);

      setSingleProduct(res.data);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError("An unknown error occurred.");
      }
    }
  }, [productId]);
  useEffect(() => {
    getSingleProduct();
  }, [productId, getSingleProduct]);

  const realPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100
  );
  return (
    <>
      <Container>
        {isError !== "" && <h2>{isError}</h2>}
        <div className="grid-detail">
          <div className="card-detailpage" key={singleProduct.id}>
            <div className="grid-product">
              <div className="product-gallery">
                <img
                  src={singleProduct.thumbnail}
                  alt="product-img"
                  className="img"
                />
              </div>
              <div className="single-productdetails">
                <div className="star-rating">
                  <StarRatings
                    rating={singleProduct.rating}
                    starDimension="28px"
                    starSpacing="1px"
                    starRatedColor="rgb(255,215,0)"
                  />
                  <span className="rating">({singleProduct.rating})</span>
                </div>
                <h2 className="singleproduct-title">{singleProduct.title}</h2>

                <div className="singleproduct-brand">
                  Brand: {singleProduct.brand} | Category:{" "}
                  {singleProduct.category} | Stock: {singleProduct.stock}
                </div>
                <div className="singleproduct-category"></div>
                <div className="singleproduct-stock"></div>
                {/* <h2>Rs.{singleProduct.price}</h2>
                <h2>discountedPercentage:{singleProduct.discountPercentage}</h2> */}
                <p className="singleproduct-description">
                  {singleProduct.description}
                </p>
                <h2 className="singleproduct-price">
                  Rs. {singleProduct.price}
                </h2>
                <div className="price-percentage">
                  <small className="discounted">
                    Rs
                    {realPrice}
                  </small>
                  <div className="singleproduct-discounted">
                    -{singleProduct.discountPercentage}%
                  </div>
                </div>

                <div>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(singleProduct.id)} // Trigger addToCart function on button click
                  >
                    {isLoading ? "Adding..." : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SingleProduct;

{
  /* <div>
<img
  src={singleProduct.thumbnail}
  alt={singleProduct.title}
  className="img"
/>
</div>

<div>
<h2>{singleProduct.title}</h2>
<p>{singleProduct.description}</p>
<div>{singleProduct.price}</div>
<div>{singleProduct.discountedPercentage}</div>
<div>{singleProduct.rating}</div>
<div>{singleProduct.stock}</div>
<div>{singleProduct.brand}</div>
<div>{singleProduct.category}</div>
</div> */
}
