import { NavLink, Outlet, useLocation } from "react-router-dom";

import "./navbar.css";
import { useState, useEffect } from "react";
import { CiUser, CiShoppingCart } from "react-icons/ci";

function Navbar() {
  const [selectedLink, setSelctedLink] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("carts")) {
      setSelctedLink("CART");
    } else if (location.pathname.includes("singleproduct")) {
      setSelctedLink("DETAILS");
    } else {
      setSelctedLink("HOME");
    }
  }, [location]);

  return (
    <>
      <div className="nav-container">
        <div className="nav1">
          <div className="free-shipping">
            FREE SHIPPING | BEST PRICE GUARANTEE{" "}
          </div>
          <div className="icons">
            <NavLink to={"construction"}>
              <div className="cart-icon">
                <CiUser />
              </div>
            </NavLink>

            <NavLink to={"/carts/1"}>
              {" "}
              <div className="cart-icon-cart">
                <CiShoppingCart />
              </div>
            </NavLink>
          </div>
        </div>
        <div className="nav2">
          <NavLink to={"/"}>
            <div className="app-title">PASA:</div>
          </NavLink>
          <div className="links">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"construction"}>
              <div>Gadgets</div>
            </NavLink>
            <NavLink to={"construction"}>
              <div>Shoes</div>
            </NavLink>
            <NavLink to={"construction"}>
              <div>Accessories</div>
            </NavLink>
            <NavLink to={"construction"}>
              <div>Brands</div>
            </NavLink>
            <NavLink to={"construction"}>
              <div>Sale</div>
            </NavLink>
          </div>
          {/* <div className="search-container">
            <div>Search</div>
            <CiSearch />
          </div> */}
        </div>
        <div className="nav3">
          <div className="upper-div">
            <h1>{selectedLink}</h1>
          </div>
          <div className="lower-div"></div>
        </div>

        <main className="ans-container">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Navbar;
