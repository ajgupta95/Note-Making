import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';




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
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('t');
        console.log('hello');
        axios.get('http://localhost:5000/note/get')
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
                <Navbar />
                <br></br>
                <br></br>
                <br></br>
                <body className="container">
                    <div>
                      
                        <div class="row">
                            
                            <div class="col-12">
                                <div class="input-group">
                                <div class="input-group-append">
                                        <button  onClick={()=>window.location='/addnote'} className="btn btn-primary" type="button">
                                            Add
                                        </button>
                                    </div>
                                    <input class="form-control border-secondary py-2" type="search"  placeholder="Search For Note By Title ..." />
                                    <div class="input-group-append">
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
                                        <tr>
                                            <td>{item.title}</td>
                                            <td>{item.content}</td>
                                            <td>{item.selectedOption}</td>
                                            <td><img src={item.url} /></td>
                                            <td>{item.updatedAt}</td>

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