
const {Router} =require('express');
const User=require('../model/user.js');
const jwt=require('jsonwebtoken');



const router=Router();



router.post('/adduser',(req, res) => {
  const email = req.body.email;
  const password=req.body.password;
  const name=req.body.name;

  const likes=[];


  const newUser = new User({email,password,likes,name});

  
    User.find({email:email}).then((ress)=>{
      console.log(ress);
      console.log(email);
      if(ress.length===0){
        newUser.save()
        console.log("save")
        res.json("user added")
        
      }else{
        res.json("user exits")
      }
      
    // .then(() => res.json('User added!'))
   // .catch(err => res.json("Errors"));
    })
  
});

router.post('/login',(req, res) => {
  const {email,password} = req.body
  
  

  User.findOne({email:email}).then(ress=>{
   if(ress===null) {
     console.log("res",ress)
       return res.json("User not exits Sign In First")}
    if(ress.password!==password.toString()){
     return  res.json("Plese Enter Correct Password")
    }

    const data={
      email:email,
      name:ress.name
    }
    var token= jwt.sign({data},'reactlogin');
    console.log("res",ress)

    console.log('jwtToken',token);
    //res.cookie('jwtTToken',token);
    res.json({msg:"logged in Successfull",t:token})
  });
});






  module.exports = router;

