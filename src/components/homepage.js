import React, { Component } from 'react';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import StartNavbar from './startnavbar';




export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.deleteNote = this.deleteNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.addLike = this.addLike.bind(this);

    

        this.state = {
            search: ''
        }

        this.state={
            messages:''
        }

        

        this.state = { notes: [] };
        }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount() {
      
        axios.get('http://localhost:5000/note/get',)
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

    addLike(id)  {
  
        let token = localStorage.getItem('t');
        const email = Jwt.verify(token, 'reactlogin');

        console.log('getttinggg',email.email);

        const sending ={
            email:email.email,
            id:id
        }

    axios.post('http://localhost:5000/note/likes/', sending)
      .then(res => {console.log(res.data)
        this.setState({
            messages: res.data
        })
        axios.get('http://localhost:5000/note/get',)
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

    updateNote(id, e) {
        // e.preventDefault();
        console.log(id);
        window.location = '/edit/' + id;
    }
  
  


    render() {
        const message=this.state.messages

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
                                        <button  onClick={()=>window.location='/addnote'} className="btn btn-primary" type="button">
                                            Add
                                        </button>
                                    </div>
                                    <input className="form-control border-secondary py-2" type="search"  placeholder="Search For Note By Title ..." />
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
                                    <th className="align-middle text-center">Actions</th>
                                    <th className="align-middle text-center">Likes</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.notes.map(item => (
                                        <tr  key={item._id}>
                                           
                                            <td>{item.title}</td>
                                            <td>{item.content}</td>
                                            <td>{item.selectedOption}</td>
                                            <td><img src={item.url} alt="" /></td>
                                            <td>{item.createdAt}</td>

                                           


                                          <td>  <button onClick={() => this.deleteNote(item._id)} className="btn btn-primary">Delete</button> || <button onClick={() => this.updateNote(item._id)} className="btn btn-primary">Update</button></td>

                                  
                                           <td>  <button className="btn btn-info" onClick= {()=>this.addLike(item._id)} > likes:{item.likes} </button> </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>


                 


                </body>
            </div>


        );
    }
}