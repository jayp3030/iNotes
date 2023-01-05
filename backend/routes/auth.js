const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


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
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password                                                                                                                                                                                                                                                                                                                                                                         
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