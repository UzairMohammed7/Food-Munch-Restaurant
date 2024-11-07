import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../Context/CartContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="m-auto d-flex flex-column align-items-center">
      <img
        src="https://img.freepik.com/premium-vector/empty-tray-…food-serving-tray-restaurant-plate_153097-836.jpg"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">You have Not Ordered Any Food Item.</p>
      <Link to='/'>
      <button className='order-some-food'>
        Order some food
      </button>
      </Link>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-items-header d-flex align-items-center justify-content-between">
        <h1 className='mx-4'>Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn text-primary mx-4"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="ps-0 d-flex flex-column align-items-center">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
    </>
  )

  return (
    <div className="cart-page-container d-flex flex-column">
      <Header />
      <div className="cart-body-container d-flex flex-column">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
