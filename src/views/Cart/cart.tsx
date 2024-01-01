import Container from "#views/Container/container";
import "./cart.css";
import axios from "../../axios";
import { useState, useCallback } from "react";

import { CartItem } from "../../App";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CartProps {
  addProduct: CartItem[];
  setAddProduct: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function Cart({ addProduct, setAddProduct }: CartProps) {
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const total = addProduct.reduce((sum, item) => {
    return item.discountedPrice + sum;
  }, 0);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    setIsLoading(true);
    try {
      const res = await axios.put("https://dummyjson.com/carts/1", {
        products: [
          {
            id: productId,
            quantity: quantity < 1 ? 1 : quantity,
          },
        ],
      });
      const newCart = addProduct.map((item) => {
        return item.id === productId ? res.data.products[0] : item;
      });
      setAddProduct(newCart);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = useCallback(
    (productId: number) => {
      const filteredCart = addProduct.filter((item) => item.id !== productId);
      setAddProduct(filteredCart);
    },
    [addProduct, setAddProduct]
  );

  return (
    <>
      <Container>
        <div className="products-summary">
          <div className="products-container">
            {isError !== "" && <h2>{isError}</h2>}
            {addProduct.map((cart) => (
              <div className="cart" key={cart.id}>
                <div className="products-inner">
                  <div>
                    <img
                      src={cart.thumbnail}
                      alt={cart.title}
                      className="cart-img"
                    />
                  </div>
                  <div>
                    <h3>{cart.title}</h3>
                  </div>

                  <div className="price-cart">Rs. {cart.price}</div>

                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(cart.id, cart.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      className="quantity-input"
                      type="text"
                      value={cart.quantity}
                      onChange={(e) =>
                        handleQuantityChange(cart.id, Number(e.target.value))
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(cart.id, cart.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-total">Rs {cart.total}</div>
                  <div className="btn-dlt">
                    <RiDeleteBin6Line onClick={() => deleteItem(cart.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-container">
            <h2>{isLoading ? "Calculating... " : "Summary"}</h2>
            <div>
              <div className="total">Total: </div>
              <div className="total-price">Rs. {total}</div>
            </div>
            <div className="check-out">
              <button onClick={() => navigate("construction")}>
                Check-out
              </button>
            </div>
          </div>
        </div>
        <div className="continue-shopping">
          <button onClick={() => navigate("/")}> Continue Shopping</button>
        </div>
      </Container>
    </>
  );
}
export default Cart;

{
  /* <p>{cart.description}</p> */
}
{
  /* <div>{cart.rating}</div>
              <div>{cart.stock}</div>
              <div>{cart.brand}</div>
              <div>{cart.category}</div> */
}

{
  /* <div>{cart.discountPercentage}</div>
              <div>{cart.discountedPrice}</div> */
}
{
  /* <h2>{cart.id}</h2> */
}

// const getCartData = async () => {
//   try {
//     const res = await axios.get("/carts/1");

//     setCartsData(res.data.products);
//   } catch (error) {
//     if (error instanceof Error) {
//       setIsError(error.message);
//     } else {
//       setIsError("An unknown error occurred.");
//     }
//   }
// };

// useEffect(() => {
//   getCartData();
// }, []);

// console.log(cartsData);

// useEffect(, []);

// rating: number;
// stock: number;
// brand: string;
// category: string;
