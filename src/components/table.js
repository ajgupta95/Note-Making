import React, { Component } from 'react';
import Moment from 'react-moment';
import Jwt from 'jsonwebtoken';
import axios from 'axios';






export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            comment: [],
            messages: ""
        }
    }
    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('t');
        const email = Jwt.verify(token, 'reactlogin');

        console.log('getttinggg', email.email);
        const id = this.props.notes._id

        const data = {
            comment: this.state.comment,
            id: id,
            email: email.email

        }
        this.props.cmt(data);

        this.setState({
            comment:''
            
         
     })
        

    }


    render() {

        return (

            <tr>
                <td>{this.props.notes.title}</td>
                <td>{this.props.notes.content}</td>
                <td>{this.props.notes.selectedOption}</td>
                <td><img src={this.props.notes.url} alt="" /></td>
                <td> <Moment format="YYYY/MM/DD HH:mm">
                    {this.props.notes.createdAt}
                </Moment></td>
                <td>
                    <form onSubmit={this.onSubmit}>
                        <label>
                           <b>Comment:</b> 
                                    <input type="text"
                                    required
                                value={this.state.comment}
                                onChange={this.onChangeComment}


                            />
                        </label>
                        <input className="btn btn-info" type="submit" value="Submit" />
                    </form>
                    <ul>
                        {this.props.notes.comments.map(item => {
                            if(item.name!==undefined){ return <li><b>{item.name}</b>:{item.comment}</li>;}
                           
                        })}
                    </ul>
                </td>
                <td>  <button className="btn btn-info" onClick={() => this.props.func(this.props.notes._id)} > likes:{this.props.notes.likes} </button> </td>




            </tr>




        )

    }




}
