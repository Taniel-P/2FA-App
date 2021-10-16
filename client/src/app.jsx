import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggInStep: 1,
      name: null,
      email: null,
      password: null,
      phone: null,
      verification: null,
      verifyRequestId: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
  }

  handleChange(e) {
    this.setState({
      [event.target.id]: e.target.value
    })
  }

  handleClick1() {
    console.log('Clicked')
    axios.post('/submitNewUser', this.state)
      .then((res) => {
        this.setState({
          loggInStep: 2
        })
      })
      .catch((err) => {
        console.log('Post Err', err)
      })
  }

  handleClick2() {
    console.log('Clicked')
    axios.post('/logIn', this.state)
      .then((res) => {
        this.setState({
          loggInStep: 3
        })
      })
      .catch((err) => {
        console.log('Post Err', err)
      })
  }

  handleClick3() {
    axios.post('/twoFactorAuth', this.state)
    .then((res) => {
      console.log('RES', res)
      this.setState({
        loggInStep: 4,
        verifyRequestId: res.data
      })
    })
    .catch((err) => {
      console.log('TwoFA ERR', err)
    })
  }

  handleClick4() {
    axios.post('/verify', this.state)
    .then((res) => {
      console.log('VERIFY RES', res)
      this.setState({
        loggInStep: 5
      })
    })
    .catch((err) => {
      console.log('VERIFY ERR', err);
    })
  }

  render() {

    if (this.state.loggInStep === 1) {
      return (
        <div className="mainCreateAccount" >
          <h1>Create Account:</h1>
          <div className="name">
          <label>Name: </label>
          <input type="text" id="name" onChange={this.handleChange}></input>
          </div>
          <div className="email">
          <label>Email: </label>
          <input type="text" id="email" onChange={this.handleChange}></input>
          </div>
          <div className="password">
          <label>Password: </label>
          <input type="text" id="password" onChange={this.handleChange}></input>
          </div>
          <button onClick={this.handleClick1}>Create my account</button>
          <h3>Have an account? Come sign in.</h3>
          <button onClick={this.handleClick1}>Sign in</button>
        </div>
      )
    }
    if (this.state.loggInStep === 2) {
      return (
        <div className="mainLoggIn">
          <h1>Log In:</h1>
          <div className="name">
          <label>Name: </label>
          <input type="text" id="name" onChange={this.handleChange}></input>
          </div>
          <div className="email">
          <label>Email: </label>
          <input type="text" id="email" onChange={this.handleChange}></input>
          </div>
          <div className="password">
          <label>Password: </label>
          <input type="text" id="password" onChange={this.handleChange}></input>
          </div>
          <button onClick={this.handleClick2}>Log in</button>
        </div>
      )
    }
    if (this.state.loggInStep === 3) {
      return (
        <div className="twofaverification">
          <h1>Enter Phone Number</h1>
          <div className="phoneNum">
            <label>Phone#: </label>
            <input type="tel" id="phone" onChange={this.handleChange}></input>
          </div>
          <button onClick={this.handleClick3}>Submit phone#</button>
        </div>
      )
    }
    if (this.state.loggInStep === 4) {
      return (
        <div className="verification">
          <h1>Enter Pin</h1>
          <div className="verifyNum">
            <label>Verification code: </label>
            <input type="text" id="verification" onChange={this.handleChange}></input>
          </div>
          <button onClick={this.handleClick4}>Submit code</button>
        </div>
      )
    }
    if (this.state.loggInStep === 5) {
      return (
        <div className="loggedIn">
          <h1>You are logged in!</h1>
          <img src="logInPic.png"></img>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
