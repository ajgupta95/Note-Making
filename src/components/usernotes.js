import React, { Component } from 'react';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import Moment from 'react-moment';

import LoginNavbar from './startnavbar';




export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.deleteNote = this.deleteNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
       


        // this.onClick = this.onClick.bind(this);

        this.state = {
            search: ''
        }

        this.state = { notes: [] };
    }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('t');
        console.log('hello');
        let token = localStorage.getItem('t');
        const email = Jwt.verify(token, 'reactlogin');
        console.log('getdvd',email);
        axios.post('http://localhost:5000/note/usernotes',email)
            .then(response => {
                console.log("getting", response);
                this.setState({ notes: response.data })
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

    updateNote(id, e) {
        // e.preventDefault();
        console.log(id);
        window.location = '/edit/' + id;
    }
  
  


    render() {
        return (
            <div>
                <LoginNavbar />
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


                                    <th className="align-middle text-center">Updated Date</th>
                                    <th className="align-middle text-center">Actions</th>

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
                                            <td> <Moment format="YYYY/MM/DD HH:mm">
                                                {item.updatedAt}
                                                 </Moment></td>

                                            {/* <td> <form onSubmit={() => this.deleteProduct(item._id)}>
                                                <div className="form-group">
                                                    <input type="submit" value="Delete" className="btn btn-primary" />
                                                </div>
                                            </form> */}


                                          <td>  <button onClick={() => this.deleteNote(item._id)} className="btn btn-primary">Delete</button>|| <button onClick={() => this.updateNote(item._id)} className="btn btn-primary">Update</button></td>


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