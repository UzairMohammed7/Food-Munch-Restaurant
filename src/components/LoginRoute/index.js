import Cookies from 'js-cookie'
import {Component} from 'react'
import { Navigate } from "react-router-dom";

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    isPasswordShown: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  // onSubmitSuccess = jwtToken => {
  //   const {history} = this.props

  //   Cookies.set('jwt_token', jwtToken, {
  //     expires: 30,
  //     path: '/',
  //   })
  //   history.replace('/')
  // }

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    // No need for history, just set state to trigger re-render
    this.setState({ showSubmitError: false });
  };

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {
      username,
      password,
      isPasswordShown,
      showSubmitError,
      errorMsg,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }
    
    return ( 
      <div className="LoginContainer">
        <form className="LoginForm" onSubmit={this.onLogin}>
           <img
             src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
             className="food-munch-logo"
             alt="img"
           />
          <div className="UsernameAndPasswordContainer">
            <label className="LabelText" htmlFor="username">
              USERNAME
            </label>
            <input
              className="InputContainer"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="LabelText" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="InputContainer"
              type={isPasswordShown ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <div className='mt-2 display-flex'>
              <input type='checkbox' id='showPassword' onChange={this.onShowPassword} />
              <label htmlFor='showPassword' className='mx-2'>Show Password</label>          
            </div>
            <button className="LoginButton" type="submit">
              Login
            </button>
            {showSubmitError && <p className="ShowErrorMsg">*{errorMsg}</p>}
          </div>
        </form>
      </div>   
    )
  }
}

export default LoginRoute
