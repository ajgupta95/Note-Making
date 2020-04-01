import React, { Component } from 'react';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import Resizer from 'react-image-file-resizer';
import LoginNavbar from './startnavbar';




export default class Addnote extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeImageurl = this.onChangeImageurl.bind(this);

        this.onChangeAboutnote = this.onChangeAboutnote.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.Logout = this.Logout.bind(this);




        this.state = {
            title: ''
        }
        this.state = {
            content: ''
        }
        this.state = {
            tags: ''
        }
        this.state = {
            url:''
        }

        this.state = {
            selectedOption: 'Important'
        }


    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeImageurl(e) {
       
    
        var fileInput = false
        console.log('getting',e.target.files[0])
        if(e.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                e.target.files[0],
                200,
                200,
                'JPEG',
                90,
                0,
                uri => {
                    console.log(uri)
                    this.setState({
                        url:uri
                    })
                    
                },
                'base64'
            );
        }
    }

    onChangeAboutnote(e) {
        this.setState({
            selectedOption: e.target.value
        })
    }

    Logout(e) {
       // e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('t');
    
    
        localStorage.removeItem("t");
        window.location='/'
    
      }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    onChangeTags(e) {
        this.setState({
            tags: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('t');


        let token = localStorage.getItem('t');
        const email = Jwt.verify(token, 'reactlogin');

        console.log('getttinggg',email.email);

        const Note = {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags,
            selectedOption: this.state.selectedOption,
            url:this.state.url,
            email:email.email
        }


        console.log(Note);

        axios.post('http://localhost:5000/note/add', Note)
            .then(res => {
                console.log("WHat Happend ? ans :", res.data);
                this.setState({
                    messages: res.data
                })



            });
        this.setState({
            title: ''
        })
        this.setState({
            content: ''
        })
        this.setState({
            tags: ''
        })

        this.setState({
            url: ''
        })


    }
    render() {
        const message = this.state.messages
        return (
            <div>

                <LoginNavbar/>
                <body className="container">
                    <h3>{message}</h3>
                    <br></br>


                    <h4>New Note</h4>
                    <br></br>
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label>Content: </label>

                            <textarea className="form-control"
                                rows="5" type="text" required value={this.state.content} onChange={this.onChangeContent} ></textarea>

                        </div>
                        <div className="form-group">
                            <label>Tags: </label>


                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.tags}
                                onChange={this.onChangeTags}
                            />

                        </div>
                        <div className="form-group">
                            <label>Image Url: </label>


                            <input type="file"
                                required
                                className="form-control"
                                
                                onChange={this.onChangeImageurl}
                            />

                        </div>
                        <br></br>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="radio">
                                    <label>
                                        <input style={{ margin: 20 }} type="radio" value="Important" checked={this.state.selectedOption === 'Important'} onChange={this.onChangeAboutnote} />

                                            Important
                                               </label>
                                </div>

                                <div className="radio">
                                    <label>
                                        <input style={{ margin: 20 }} type="radio" value="Simple" checked={this.state.selectedOption === 'Simple'} onChange={this.onChangeAboutnote} />

                                            Simple
                                                </label>
                                </div>
                            </div>
                        </div>


                        <div className="form-group" style={{ textAlign: "center" }}>
                            <input type="submit" value="Add" className="btn btn-primary" />
                        </div>

                    </form>
                    <button onClick={()=>this.Logout()} className="btn btn-primary">Logout</button>

                </body>

            </div>
        )
    }


}