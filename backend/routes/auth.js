const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// create a user using :POST "/api/auth/createuser"



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
      res.json(user)
    }
      catch(error){
        console.error(error.message)
        res.status(500).send("Some ERROR occured")
      }
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //     res.json({error:'Enter valid credentials' , message : err.massage})});
    
})

module.exports = router;