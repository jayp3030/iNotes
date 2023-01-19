import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
    
    const host = 'http://localhost:5000'

    const notesInitial = []
    const [notes , setNotes] = useState(notesInitial)

      // get all notes 
      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes` , {
          method : 'GET',
          headers :{
            'Content-Type':'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiODE2MmJhN2Q5Zjc3MTIwNDg3ODc4In0sImlhdCI6MTY3MzEwNjQ1NX0.yuPRNMzwJ2hqJpO7fyBkMJj_VP-jjdfNWihf9jU9QhE'
          }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json)
      }

      // add note 
      const addNote = async(title,description,tag)=>{
        const response = await fetch (`${host}/api/notes/addnote` , {
          method : 'POST',
          headers :{
            'Content-Type':'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiODE2MmJhN2Q5Zjc3MTIwNDg3ODc4In0sImlhdCI6MTY3MzEwNjQ1NX0.yuPRNMzwJ2hqJpO7fyBkMJj_VP-jjdfNWihf9jU9QhE'
          },
          body:JSON.stringify({title,description,tag})
        });
        const note = response.json();
        setNotes(notes.concat(note))
      }
      // delete note 
      const deleteNote =async (id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
          method : 'DELETE',
          headers :{
            'Content-Type':'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiODE2MmJhN2Q5Zjc3MTIwNDg3ODc4In0sImlhdCI6MTY3MzEwNjQ1NX0.yuPRNMzwJ2hqJpO7fyBkMJj_VP-jjdfNWihf9jU9QhE'
          },
        });
        const json = await response.json();
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      }
      // edit note 
      const editNote = async (id , title ,description ,tag)=>{

        // fetch api 
          const response = await fetch(`${host}/api/notes/updatenote/${id}` , {
            method : 'PUT',
            headers :{
              'Content-Type':'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiODE2MmJhN2Q5Zjc3MTIwNDg3ODc4In0sImlhdCI6MTY3MzEwNjQ1NX0.yuPRNMzwJ2hqJpO7fyBkMJj_VP-jjdfNWihf9jU9QhE'
            },
            body:JSON.stringify()
          });
          const json = await response.json({title,description,tag});
        

        // logic to edit notes 
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;