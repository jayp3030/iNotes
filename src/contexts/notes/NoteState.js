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
        // const json = response.json();

          const note={
            "_id": "63bfd939aee4a000ad9c7fdf45",
            "user": "63b8162ba7d9f77120487878",
            "title": title,
            "description": description,
            "tag": "demo",
            "date": "2023-01-12T09:56:09.097Z",
            "__v": 0
          };
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
        console.log(json)
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      }
      // edit note 
      const editNote = async (id , title ,description ,tag)=>{

        // fetch api 
          const response = await fetch(`${host}/api/notes/updatenote/${id}` , {
            method : 'POST',
            headers :{
              'Content-Type':'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiODE2MmJhN2Q5Zjc3MTIwNDg3ODc4In0sImlhdCI6MTY3MzEwNjQ1NX0.yuPRNMzwJ2hqJpO7fyBkMJj_VP-jjdfNWihf9jU9QhE'
            },
            body:JSON.stringify()
          });
          const json = response.json({title,description,tag});

        // logic to edit notes 

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
      }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
} ;

export default NoteState;