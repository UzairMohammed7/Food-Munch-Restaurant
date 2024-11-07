import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import DishItem from "../DishItem";
import CartContext from "../../Context/CartContext";

import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";


import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const { cartList, setRestaurantName } = useContext(CartContext);

  const getUpdatedData = (tableMenuList) =>
    tableMenuList.map((eachMenu) => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map((eachDish) => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }));
  console.log(getUpdatedData);

  const fetchRestaurantApi = async () => {
    const api =
      "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details";
    const apiResponse = await fetch(api);
    const data = await apiResponse.json();
    console.log(data);
    const updatedData = getUpdatedData(data[0].table_menu_list);
    setResponse(updatedData);
    setRestaurantName(data[0].restaurant_name);
    setActiveCategoryId(updatedData[0].menuCategoryId);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRestaurantApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = [
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-soup-img.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-gluten-img.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-ginger-fried-img.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-grilled-seafood-img.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-hyderabadi-biryani-img.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-mushroom-noodles-img.png",
  ];
   const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  const addItemToCart = () => {}
  const removeItemFromCart = () => {}

  const onUpdateActiveCategoryIdx = (menuCategoryId) =>
    setActiveCategoryId(menuCategoryId);

  const renderTabMenuList = () =>
    response.map((eachCategory, index) => {
      const onClickHandler = () =>
        onUpdateActiveCategoryIdx(eachCategory.menuCategoryId);

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? "active-tab-item"
              : ""
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
        <div className="button-wrapper">
          <button
            className={`image-button ${activeIndex === index ? 'active' : 'inactive'}`}
            onClick={() => handleButtonClick(index)}
            style={{ backgroundImage: `url(${images[index % images.length]})` }} 
          >
            <div className="category-btn">
              {eachCategory.menuCategory}
            </div>
          </button>
        </div>

        </li>
      );
    });


  const renderDishes = () => {
    const { categoryDishes } = response.find(
      (eachCategory) => eachCategory.menuCategoryId === activeCategoryId
    );

    return (
      <ul className="mx-5 d-flex flex-column dishes-list-container">
        {categoryDishes.map((eachDish) => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    );
  };

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  );

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartList} />
      <div
        id="bannerSection"
        className="banner-section-bg-container d-flex justify-content-center flex-column"
      >
        <div className="text-center">
          <div className="heading-container">
            <h1 className="banner-heading">Get Delicious Food
              <span className="mx-2 mt-2 typing-animation"></span>
            </h1>
          </div>
          <p className="banner-caption mb-4">Eat Smart & Healthy</p>
          <a href="#exploremenuSection">
            <button className="custom-button">View Menu</button>
          </a>
        </div>
      </div>

      <div className="wcu-section pt-5" id="wcuSection">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="wcu-section-heading">Why Choose Us?</h1>
              <p className="wcu-section-description">
                We use both original recipes and classNameic versions of famous
                food items.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-3 mb-3">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-serve.png"
                  className="wcu-card-image"
                  alt="food-img"
                />
                <h1 className="wcu-card-title mt-3">Food Service</h1>
                <p className="wcu-card-description">
                  Experience fine dining at the comfort of your home. All our
                  orders are carefully packed and arranged to give you the
                  nothing less than perfect.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-3 mb-3">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/fruits-img.png"
                  className="wcu-card-image"
                  alt="food-img"
                />
                <h1 className="wcu-card-title mt-3">Fresh Food</h1>
                <p className="wcu-card-description">
                  The Fresh Food group provides fresh-cut fruits and vegetables
                  directly picked from our partner farms and farm houses so that
                  you always get them tree to plate.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="wcu-card p-3 mb-3">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/offers-img.png"
                  className="wcu-card-image"
                  alt="food-img"
                />
                <h1 className="wcu-card-title mt-3">Best Offers</h1>
                <p className="wcu-card-description">
                  Food Coupons & Offers upto
                  <span className="offers">50% OFF</span>
                  and Exclusive Promo Codes on All Online Food Orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-5 pt-5" id="exploremenuSection">
        <h1 className="menu-section-heading">Restaurant Menu</h1>
        <ul className="d-flex tab-container ">
          {renderTabMenuList()}
        </ul>
      </div>
      {renderDishes()}

      <div
        className="delivery-and-payment-section pt-5 pb-5"
        id="delieryandpaymentSection"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 order-1 order-md-2">
              <div className="text-center">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/delivery-payment-section-img.png"
                  className="delivery-and-payment-section-img"
                  alt="food-img"
                />
              </div>
            </div>
            <div className="col-12 col-md-7 order-2 order-md-1">
              <h1 className="delivery-and-payment-section-heading">
                Delivery and Payment
              </h1>
              <p className="delivery-and-payment-section-description">
                Enjoy hassle-free payment with the plenitude of payment options
                available for you. Get live tracking and locate your food on a
                live map. It's quite a sight to see your food arrive to your
                door. Plus, you get a 5% discount on every order every time you
                pay online.
              </p>
              <button className="custom-button">Order Now</button>
              <div className="mt-3">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/visa-card-img.png"
                  className="payment-card-img"
                  alt="payment-img"
                />
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/master-card-img.png"
                  className="payment-card-img"
                  alt="payment-img"
                />
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/paypal-card-img.png"
                  className="payment-card-img"
                  alt="payment-img"
                />
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/american-express-img.png"
                  className="payment-card-img"
                  alt="payment-img"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container thanking-customers-section pt-3 pb-3">
          <div className="row">
            <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
              <h1 className="thanking-customers-section-heading">
                Thank you for being a valuable customer to us.
              </h1>
              <p className="thanking-customers-section-description">
                We have a surprise gift for you
              </p>
              <div className="d-md-none">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png"
                  className="thanking-customers-section-img"
                  alt="thanks-img"
                />
              </div>

              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn custom-button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Redeem Gift
              </button>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <img
                        src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/gift-voucher-img.png"
                        className="w-100"
                        alt="voucher-img"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 d-none d-md-block">
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png"
                className="thanking-customers-section-img"
                alt="thanking-img"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="healthy-food-section pt-5 pb-5" id="healthyfoodSection">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="text-center">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/healthy-food-plate-img.png"
                  className="healthy-food-section-img"
                  alt="food-img"
                />
              </div>
            </div>
            <div className="col-12 col-md-7">
              <h1 className="healthy-food-section-heading">
                Fresh, Healthy, Organic, Delicious Fruits
              </h1>
              <p className="healthy-food-section-description">
                Say no to harmful chemicals and go fully organic with our range
                of fresh fruits and veggies. Pamper your body and your senses
                with the true and unadulterated gifts from mother nature. with
                the true and unadulterated gifts from mother nature.
              </p>
              <button className="custom-button">Watch Video</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-container" id="followusSection">
        <div className="follow-us-section pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="follow-us-section-heading">Follow Us</h1>
                <div className="d-flex flex-row justify-content-center">
                  <div>
                    <FaXTwitter className="icon" />
                  </div>
                  <div>
                    <IoLogoInstagram className="icon" />
                  </div>
                  <div>
                    <FaFacebook className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer-section pt-4 pb-4">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <img
                  src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-logo-light.png"
                  className="food-munch-logo"
                  alt="food-img"
                />
                <h1 className="footer-section-mail-id">
                  orderfood@foodmunch.com
                </h1>
                <p className="footer-section-address">
                  King Faisal Road, Riyad, Saudi Arabia.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
