const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "JayisagoodB$oy"


//rout:1 -  create a user using :POST "/api/auth/createuser" log in not ruquired

router.post('/createuser' ,[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter valid Email').isEmail(),
    body('password','Minimum Password length 5').isLength({ min: 5 }),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    let user = await  User.findOne({email:req.body.email})
    if (user) {
        return res.status(400).json({error:'user already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password , salt)

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass                                                                                                                                                                                                                                                                                                                                                                         
      })

      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data , JWT_SECRET)
      // console.log(authToken);
      res.json({authToken})
      // res.json(user)
    }
      catch(error){
        console.error(error.message)
        res.status(500).send("Internal SERVER ERROR")
      }
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //     res.json({error:'Enter valid credentials' , message : err.massage})});
    
})

//rout:2 - create a user using :POST "/api/auth/login" no log in required

router.post('/login' ,[
  body('email','Enter valid Email').isEmail(),
  body('password','Minimum Password length 5').exists(),
], async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email , password} = req.body;
  try {
    let user = await User.findOne({email});

    if (!user) {
      succes = false;
      return res.status(400).json({error:'pleas enter valid credential'})
    }

    const comparePass = await bcrypt.compare(password,user.password)
    if (!comparePass) {
      return res.status(400).json({succes , error:'pleas enter valid credential'})
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data , JWT_SECRET)
    succes = true;
    res.json({ succes , authToken})
  } catch(error){
    console.error(error.message)
    res.status(500).send("Internal SERVER ERROR ")
  }
})


// route:3- GET loggedin use detail using :POST "/api/auth/getuser"  log in required

router.post('/getuser',fetchuser, async (req,res)=>{

  try {
    userId=req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal SERVER ERROR ")
  }
})
module.exports = router;