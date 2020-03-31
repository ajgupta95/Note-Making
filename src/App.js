import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Addnote from './components/addnote'
import Homepage from './components/homepage'
import Editnote from './components/editnote'

import Signup from './components/usersignup'
import Login from './components/userlogin'
import UserNotes from './components/usernotes';

import PrivateRoute from './components/privateroutes';







function App() {
  return (
    <Router>
           <Route  path='/login' exact component={Login} />
           <Route  path='/signup' exact component={Signup} />

           <PrivateRoute  path='/usernotes' exact component={UserNotes} />

     <PrivateRoute  path='/addnote' exact component={Addnote} />
     <Route path='/' exact component={Homepage} />

     <PrivateRoute  path='/edit/:id' exact component={Editnote} />



    </Router>
  );
}

export default App;
