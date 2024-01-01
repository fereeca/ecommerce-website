// import { CiShoppingCart } from "react-icons/ci";

import StarRatings from "react-star-ratings";

import "./productitem.css";
import { Product } from "../../App";

interface ProductItemProps {
  product: Product;
  handleDetails: (id: number) => void;
  addToCart: (id: number) => void;
}

function ProductItem({ product, handleDetails, addToCart }: ProductItemProps) {
  const realPrice = Math.round(
    product.price + (product.price * product.discountPercentage) / 100
  );
  return (
    <>
      <div className="product-card" onClick={() => handleDetails(product.id)}>
        <div className="badge">-{product.discountPercentage}%</div>
        <div className="product-tumb">
          <img src={product.thumbnail} alt=""></img>
        </div>
        <div className="product-details">
          <span className="product-catagory">{product.category}</span>
          <h4>
            <a href="">{product.title}</a>
          </h4>
          <StarRatings
            rating={product.rating}
            starDimension="17px"
            starSpacing="1px"
            starRatedColor="rgb(255,215,0)"
          />
          <span className="rating">({product.rating})</span>
          {/* <p>{product.description}</p> */}
          <div className="product-bottom-details">
            <div className="product-price">
              <small>
                Rs
                {realPrice}
              </small>
              Rs {product.price}
            </div>
            <div
              className="product-links"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                addToCart(product.id);
              }}
            >
              <i className="fa fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*<div key={product.id}>
<button className="card" onClick={() => handleDetails(product.id)}>
  <img src={product.thumbnail} alt={product.title} className="img" />
  <div className="details">
    
    <h2 className="detail-title">{product.title}</h2>
    <div>{product.brand}</div>
    <div>{product.category}</div>
     <p>{product.description}</p> 
    <div>Rs. {product.price}</div>
    <div>-{product.discountPercentage}%</div>
    <StarRatings
      rating={product.rating}
      starDimension="17px"
      starSpacing="1px"
      starRatedColor="rgb(255,215,0)"
    />
    ({product.rating})<div>{product.stock}</div> 
    <div className="btn">
      <CiShoppingCart
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          addToCart(product.id);
        }}
      />
    </div>
  </div>
</button>
</div> */
export default ProductItem;
