import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Addnote from './components/addnote'
import Homepage from './components/homepage'
import Editnote from './components/editnote'



function App() {
  return (
    <Router>
           <Route  path='/' exact component={Homepage} />

     <Route  path='/addnote' exact component={Addnote} />
     <Route  path='/edit/:id' exact component={Editnote} />



    </Router>
  );
}

export default App;
