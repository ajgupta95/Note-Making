import React, { Component } from 'react';
import axios from 'axios';

import NavbarStart from './startnavbar';


export default class EditNotes extends Component {
  constructor(props) {
    super(props);

   
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeImageurl = this.onChangeImageurl.bind(this);

    this.onChangeAboutnote = this.onChangeAboutnote.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

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
      url: ''
  }
    this.state = {
      selectedOption: ''
  }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/note/'+this.props.match.params.id)
      .then(response => {
        console.log(response)
        this.setState({
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          url: response.data.url,

          selectedOption:response.data.selectedOption
          

        })   
      })
      .catch(function (error) {
        console.log(error);
      })

   

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    })
  }

  onChangeImageurl(e) {
    this.setState({
      url: e.target.value
    })
  }

  onChangeAboutnote(e) {
    this.setState({
        selectedOption: e.target.value
    })
}

 

  onChangeTags(e) {
    this.setState({
      tags: e.target.value
    })
  }

  

  onSubmit(e) {
    e.preventDefault();

    const Note = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      url: this.state.url,

      selectedOption: this.state.selectedOption,

      

    }
 
    console.log(Note);

    axios.post('http://localhost:5000/note/' + this.props.match.params.id, Note)
      .then(res => {console.log(res.data)
        this.setState({
            messages: res.data
        })});

  
  }

  render() {
    
        const message = this.state.messages
        return (
            <div>
                <NavbarStart />

                <body className="container">
                    <h3>{message}</h3>
                    <br></br>


                    <h4>Update Note</h4>
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
                            <i class="fa fa-usd" aria-hidden="true"></i>

                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.tags}
                                onChange={this.onChangeTags}
                            />

                        </div>
                        <div className="form-group">
                            <label>Image Url: </label>
                            

                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.url}
                                onChange={this.onChangeImageurl}
                            />

                        </div>
                        <div className="row">
                                <div className="col-sm-12">
                                    <div className="radio">
                                        <label>
                                            <input style={{margin:20 }} type="radio" value="Important" checked={this.state.selectedOption === 'Important'} onChange={this.onChangeAboutnote} />

                                            Important
                                               </label>
                                    </div>
                                   
                                    <div className="radio">
                                        <label>
                                            <input style={{margin:20 }} type="radio" value="Simple" checked={this.state.selectedOption === 'Simple'} onChange={this.onChangeAboutnote} />

                                            Simple
                                                </label>
                                    </div>
                                </div>
                            </div>
                        
                        <div className="form-group" style={{ textAlign: "center" }}>
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </body>

            </div>
    )
  }
}