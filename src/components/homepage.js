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
        this.onSearch = this.onSearch.bind(this);


        this.input = React.createRef();






        this.state = {
            search: ''
        }

        this.state = {
            messages: '',
            savenotes:[]
        }




        this.state = { notes: [] };
                  }

    onChangeSearch(e) {


        // this.setState({
        //     search: e.target.value
        // })
        let searchvalue=e.target.value;
        let purenote=this.state.savenotes;
        let notes=this.state.notes;
        console.log('hereee',notes);
        console.log('search',searchvalue);
        let newNotes=[];

        // const newNote=notes.filter((note)=>{
            
        //     // if(searchvalue!==''){
        //     //     return 
        //     // }
        //     return note.title===searchvalue
        // })
        // console.log('hereee now',newNote);

        // this.setState({
        //     notes: newNote
        // })
    if(e.target.value !== ""){
        newNotes=notes.filter(item=>{
            const note=item.title.toLowerCase();
            const filter=searchvalue.toLowerCase();
            console.log("ijej",note.includes(filter))
            return note.includes(filter);
        });
        this.setState({
            notes:newNotes
        });
    }else{
        const purenote=this.state.savenotes
        console.log('savenote dswdqwdw',purenote)
        // axios.get('http://localhost:5000/note/get')
        // .then(response => {
        //     console.log("getting", response);
        //     this.setState({ notes: response.data })
        //     this.setState({ likes: response.data.likes })

        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        this.setState({
            notes:purenote
        });
    }
   
      

    }



    componentWillMount() {

        axios.get('http://localhost:5000/note/get')
            .then(response => {
                console.log("getting", response);
                this.setState({ notes: response.data })
                this.setState({ savenotes: response.data })

                this.setState({ likes: response.data.likes })

            })
            .catch((error) => {
                console.log(error);
            })
    }
    onSearch(){
        const searchvalue=this.state.search;
        const notes=this.state.notes;
        console.log('hereee',notes);
        console.log('search',searchvalue);

        const newNote=notes.filter((note)=>{
            
            // if(searchvalue!==''){
            //     return 
            // }
            return note.title===searchvalue
        })
        console.log('hereee now',newNote);

        this.setState({
            notes: newNote
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
        const data = Jwt.verify(token, 'reactlogin');

        console.log('getttinggg', data);

        const sending = {
            email: data.data.email,
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


    };



    addComment(data, e) {
        // e.preventDefault();

        console.log(data);
        axios.post('http://localhost:5000/note/comment/', data)
            .then((res) => {
                console.log(res)

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

    noteslist() {
        return this.state.notes.map((notes) => {
            return < Table func={this.addLike} cmt={this.addComment} notes={notes} />

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
                                        <i className="fa fa-plus"></i>

                                            
                                        </button>
                                    </div>
                                    <input className="form-control border-secondary py-2" type="text" required
                                        
                                        value={this.state.search}
                                        onChange={this.onChangeSearch} placeholder="Search For Note By Title ..." />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" onClick={()=>this.onSearch}>
                                        <i className="fa fa-search"></i>
                                            
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