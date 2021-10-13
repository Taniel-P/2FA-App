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
      password: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
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


  render() {

    if (this.state.loggInStep === 1) {
      return (
        <div className="mainCreateAccount" >
          <h1>Create Account:</h1>
          <label>Name:</label>
          <input type="text" id="name" onChange={this.handleChange}></input>
          <label>Email:</label>
          <input type="text" id="email" onChange={this.handleChange}></input>
          <label>Password:</label>
          <input type="text" id="password" onChange={this.handleChange}></input>
          <button onClick={this.handleClick1}>Log in</button>
          <h3>Click log in to skip to log in page if you have an account</h3>
        </div>
      )
    }
    if (this.state.loggInStep === 2) {
      return (
        <div className="mainLoggIn">
          <h1>Log In:</h1>
          <label>Name:</label>
          <input type="text" id="name" onChange={this.handleChange}></input>
          <label>Email:</label>
          <input type="text" id="email" onChange={this.handleChange}></input>
          <label>Password:</label>
          <input type="text" id="password" onChange={this.handleChange}></input>
          <button onClick={this.handleClick2}>Log in</button>
        </div>
      )
    }
    if (this.state.loggInStep === 3) {
      return (
        <div className="loggedIn">
          <h1>You are logged in!</h1>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
