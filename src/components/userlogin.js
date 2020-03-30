import React, { Component } from 'react';
import axios from 'axios';
import StartingNavbar from './startnavbar'


export default class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: ''
    }
    this.state = {
        password: ''
      }
    this.state={
        messages:''
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password:this.state.password
    }

    console.log(user);

    axios.post('http://localhost:5000/user/login', user)
      .then(res => {
        console.log(res)
        if(res.data==="Plese Enter Correct Password"){
          this.setState({
            messages:res.data
        })
      }else{
          console.log(res.data);
          localStorage.setItem('t',res.data.t);
          axios.defaults.headers.common['Authorization'] = `${res.data.t}` 

          this.setState({
           messages:res.data.msg

           
    })
    window.location = '/homepage';

       }});
      
      

    // this.setState({
    //   email: ''
    // })
    // this.setState({
    //     password: ''
    //   })
  }

  render() {
      const message=this.state.messages
    return (
      <div>
        <StartingNavbar/>
          <h3>{message}</h3>
          <h4>Does not have a account then: Sign Up</h4>

          <br></br>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Log In" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}