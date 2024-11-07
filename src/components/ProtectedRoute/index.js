// import {Redirect, Route} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const ProtectedRoute = props => {
//   const jwtToken = Cookies.get('jwt_token')
//   if (jwtToken === undefined) {
//     return <Redirect to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute

import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
const ProtectedRoute = ({children}) => {
  const jwtToken = Cookies.get('jwt_token')
  
  if (!jwtToken) {
    return <Navigate to="/login" />
  }
  
  return children
}
export default ProtectedRoute