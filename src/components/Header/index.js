import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Cookies from "js-cookie";

import CartContext from "../../Context/CartContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Header = () => {
  const { cartList } = useContext(CartContext);

  const onLogout = () => {
    Cookies.remove("jwt_token");
    window.location.replace("/login");
  };

  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button" data-testid="cart">
          <AiOutlineShoppingCart/>
        </button>
      </Link>
      <div class="cart-count-badge d-flex justify-content-center align-items-center">
        <p class="m-0 cart-count">{cartList.length}</p>
      </div>
    </div>
  );

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top px-4">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">
           <img
             src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
             className="food-munch-logo"
             alt="img"
           />
         </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#wcuSection">
                Why Choose Us?
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#exploremenuSection">
                Expore Menu
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#delieryandpaymentSection">
              Delivery & Payment
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#followusSection">
                Follow Us
              </a>
            </li>    
          </ul>
            <button type="button" className="btn mr-2 ms-2 me-2 btn-sm logout-btn" onClick={onLogout}>Logout</button>
            {renderCartIcon()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
