import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  addCartItem: () => {},
  removeAllCartItem: () => {},
})

export default CartContext
