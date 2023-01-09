const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//rout:1 -  get all notes :GET "/api/auth/fetchallnotes" log ruquired
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
 try {
     const notes = await Note.find({user:req.user.id})
     res.json(notes)  
 } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal SERVER ERROR ")
 }

})

//rout:2 -  add new notes :POST "/api/auth/addnote" log ruquired
router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Description must be minimum length 5').isLength({ min: 5 }),
] ,async (req,res)=>{
    try {
    const {title , description , tag } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
        title , description , tag , uer:req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal SERVER ERROR ")
    }
})

module.exports = router;