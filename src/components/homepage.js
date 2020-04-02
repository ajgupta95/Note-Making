import React, { Component } from 'react';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import Moment from 'react-moment';
import StartNavbar from './startnavbar';
import Table from './table';




export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.deleteNote = this.deleteNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.addLike = this.addLike.bind(this);
        this.addComment = this.addComment.bind(this);
        //this.onChangeComment = this.onChangeComment.bind(this);
        this.input = React.createRef();
        





        this.state = {
            search: ''
        }

        this.state = {
            messages: ''
        }

        // this.state = {
        //     comment: ''
        // }


        this.state = { notes: [] };
    }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    // onChangeComment(e) {

    //     console.log("idddd", e.target.id)
    //     if (e.target.id) {
    //         this.setState({
    //             comment: e.target.value
    //         })
    //     }
    // }

    componentWillMount() {

        axios.get('http://localhost:5000/note/get')
            .then(response => {
                console.log("getting", response);
                this.setState({ notes: response.data })
                this.setState({ likes: response.data.likes })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteNote(id, e) {
        // e.preventDefault();

        axios.delete('http://localhost:5000/note/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
        })
    }

    addLike(id) {

        let token = localStorage.getItem('t');
        const email = Jwt.verify(token, 'reactlogin');

        console.log('getttinggg', email.email);

        const sending = {
            email: email.email,
            id: id
        }

        axios.post('http://localhost:5000/note/likes/', sending)
            .then(res => {
                console.log(res.data)
                this.setState({
                    messages: res.data
                })
                axios.get('http://localhost:5000/note/get')
                    .then(response => {
                        console.log("getting", response);
                        this.setState({ notes: response.data })
                        this.setState({ likes: response.data.likes })

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            });

        // window.location='/'
    };
    // addComment(id) {

    //     // this.setState({
    //     //     comment: e.target.value
    //     // })


    //     const comments = this.state.comment
    //     console.log("comment", comments);
    //     const data = {

    //         comment: comments,
    //         id: id
    //     }
    //     console.log("comment data", data);
    //     axios.post('http://localhost:5000/note/comment/', data)
    //         .then((res) => console.log(res))

    // }


    addComment(data,e){
       // e.preventDefault();
       
       console.log(data);
       axios.post('http://localhost:5000/note/comment/', data)
            .then((res) => {console.log(res)
                
                this.setState({
                    messages: res.data
                })
                axios.get('http://localhost:5000/note/get')
                .then(response => {
                    console.log("getting", response);
                    this.setState({ notes: response.data })
                    this.setState({ likes: response.data.likes })
    
                })
                .catch((error) => {
                    console.log(error);
                })
            })
    }

    updateNote(id, e) {
        // e.preventDefault();
        console.log(id);
        window.location = '/edit/' + id;
    }

    noteslist(){
    return this.state.notes.map((notes)=>{
      return  < Table func={this.addLike} cmt={this.addComment} notes={notes} />
           
     })
 
    }



    render() {
        const message = this.state.messages

        return (
            <div>
                <h3>{message}</h3>
                <StartNavbar />
                <br></br>
                <br></br>
                <br></br>
                <body className="container">
                    <div>

                        <div className="row">

                            <div className="col-12">
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <button onClick={() => window.location = '/addnote'} className="btn btn-primary" type="button">
                                            Add
                                        </button>
                                    </div>
                                    <input className="form-control border-secondary py-2" type="search" placeholder="Search For Note By Title ..." />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>

                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>

                                    <th className="align-middle text-center">Title</th>
                                    <th className="align-middle text-center">Content</th>
                                    <th className="align-middle text-center">About Note</th>
                                    <th className="align-middle text-center">Image</th>
                                    <th className="align-middle text-center">Created Date</th>
                                    <th className="align-middle text-center">Comments</th>
                                    <th className="align-middle text-center">Likes</th>


                                </tr>
                            </thead>
                           
                                {/* {
                                    this.state.notes.map(item => (
                                        <tr key={item._id}>

                                            <td>{item.title}</td>
                                            <td>{item.content}</td>
                                            <td>{item.selectedOption}</td>
                                            <td><img src={item.url} alt="" /></td>
                                            <td> <Moment format="YYYY/MM/DD HH:mm">
                                                {item.createdAt}
                                            </Moment></td>




                                            {/* <td>  <button onClick={() => this.deleteNote(item._id)} className="btn btn-primary">Delete</button> || <button onClick={() => this.updateNote(item._id)} className="btn btn-primary">Update</button></td> */}

                                            {/* <td key={item._id}>
                                            
                                                    <label>Comments: </label>
                                                    <input type="text"
                                                        required
                                                        id={item._id}
                                                        className="form-control"
                                                        value={this.state.comment}
                                                        onChange={this.onChangeComment}
                                                    />

                                                    <button  className="btn btn-info" onClick={() => this.addComment(item._id)} >Comment</button>
                                                
                                            </td> */}
                                            {/* <td>
                                                <form onSubmit={this.addComment}>
                                                    <label>
                                                        Comment:
                                                    <input type="text"
                                                    id={item._id}
                                                   
                                                    ref={this.input} 
                                                    />
                                                    </label>
                                                    <input className="btn btn-info" type="submit" value="Submit" />
                                                </form>
                                            </td>
                                            <td>  <button className="btn btn-info" onClick={() => this.addLike(item._id)} > likes:{item.likes} </button> </td>
                                        </tr>
                                    ))
                                } */} 
                                 <tbody>
                                 
                                 {this.noteslist()} 
                                 
                                 

                            </tbody>
                        </table>
                    </div>





                </body>
            </div>


        );
    }
}