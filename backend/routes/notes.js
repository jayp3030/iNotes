const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//rout:1 -  get all notes :GET "/api/notes/fetchallnotes" log ruquired
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
 try {
     const notes = await Note.find({user:req.user.id})
     res.json(notes)  
 } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal SERVER ERROR ")
 }

})

//rout:2 -  add new notes :POST "/api/notes/addnote" log ruquired
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

//rout:3 -  UPDATE notes :POST "/api/notes/updatenote" log ruquired

router.put('/updatenote/:id', fetchuser,async (req,res)=>{
    const {title , description , tag} = req.body;

    const newNote ={}

    if (title) {
        newNote.title=title
    }
    if (description) {
        newNote.description=description
    }
    if (tag) {
        newNote.tag=tag
    }

    // find a note to be updated and update it 
    let note = await Note.findById(req.params.id)

    if (!note) {
       return res.status(404).send('NOT FOUND')
    }

    if (String(note.user) !== req.user.id) {
        console.log('im running')
        return res.status(401).send('Not Allowed')
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set:newNote} , {new:true})

    res.json({note})
})

module.exports = router;