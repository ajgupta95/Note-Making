import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Addnote from './components/addnote'
import Homepage from './components/homepage'
import Editnote from './components/editnote'

import Signup from './components/usersignup'
import Login from './components/userlogin'
import PrivateRoute from './components/privateroutes';







function App() {
  return (
    <Router>
           <Route  path='/' exact component={Login} />
           <Route  path='/signup' exact component={Signup} />


     <PrivateRoute  path='/addnote' exact component={Addnote} />
     <PrivateRoute path='/homepage' exact component={Homepage} />

     <PrivateRoute  path='/edit/:id' exact component={Editnote} />



    </Router>
  );
}

export default App;
