import React, { Component, Fragment } from 'react';
import Home from './Components/Home';
import Bookmarks from './Components/Bookmarks';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './Components/Authenticate'
import { api, setJwt } from './Api/init'
import decodeJWT from 'jwt-decode'


class App extends Component {
  constructor(){
    super()
    this.state = {
      loginError: null,
    }
  }

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
     localStorage.setItem('token', value)
  }

  get expiry() {
    return localStorage.getItem('expiry')
  }

  set expiry(value) {
    localStorage.setItem('expiry', value)
  }

  authenticate = async (event, url) => {
    try {
      event.preventDefault()
      const form = event.target

      const response = await api.post(`/auth${url}`, {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      
      this.token = response.data.token
      const tokenDetails = this.token && decodeJWT(this.token)
      this.expiry = tokenDetails.exp

      
      setJwt(response.data.token)
      this.forceUpdate()


    } catch (error) {
      this.setState({
        loginError: error.message
      })
    }
  }

  expiryCheck = () => {
    const expired = (localStorage.expiry * 1000) - Date.now()

    if ((this.token && this.expiry) && expired >= 0) {
      this.token = localStorage.token
      this.expiry = localStorage.expiry
      setJwt(this.token)  
    } else {
      this.token = ''
      this.expiry = ''
    }
  }

  componentWillMount(){
    this.expiryCheck() 
  }


  signOut = () => {
    api.get('/auth/logout').then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('expiry')
        this.forceUpdate()
    })
  }

  render() {
    const { loginError } = this.state
    const token = this.token
    const tokenDetails = token && decodeJWT(token)
    // console.log(tokenDetails)
    return (
      <Router>
        <div className="App">
        
          <div className="nav-bar">
            <Link to="/">Home</Link>
            {token && <Link to="/bookmarks">Bookmarks</Link>   }
            {token && <button onClick={this.signOut}>Logout</button>}
            
            {!token && <Link to="/login">Login</Link>}
            {!token && <Link to="/register">Register</Link>}

          </div>


          <Route exact path="/" component={Home} />
          <Route  path="/bookmarks" render={(routerProps) => {
            if (token) {
              return <Bookmarks role={tokenDetails.role} {...routerProps} />
            } else {
              return <h1> 401: You are unauthorised to view this page!</h1>
            }
          }} />

          <Route  path="/register" render={(routerProps) => (
            <SignIn {...routerProps} loginError={loginError} authenticate={this.authenticate} />
          )} />

          <Route  path="/login" render={(routerProps) => {
            if (token) {
              return (
                <Fragment>
                  <h4>Welcome {tokenDetails.email}!</h4>
                  <p>You Loggin in at : {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                  <p>Your token expires at : {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                  <p>The time now is: {Date.now().toLocaleString()}</p>
                </Fragment>
              )
            } else {
              return <SignIn {...routerProps} loginError={loginError} authenticate={this.authenticate} />
            }
          }} />
            
         
        </div>
      </Router>
    );
  }
}

export default App;
