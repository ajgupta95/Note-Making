

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Notes', {useNewUrlParser: true}).then((res )=>{
    console.log('connected to db')
},(err)=>{
    console.log('not connected to db:', err )
})


const noteRouter = require('./route/note.js');


app.use('/note', noteRouter);


app.listen(5000, () => {
    console.log("Server is running on port: 6000");
});













