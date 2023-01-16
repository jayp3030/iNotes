import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
    const notesInitial = [
        {
          "_id": "63bfd928aee4a000ad9c7fdb",
          "user": "63b8162ba7d9f77120487878",
          "title": "omm2",
          "description": "hi how are you",
          "tag": "demo",
          "date": "2023-01-12T09:55:52.427Z",
          "__v": 0
        },
        {
          "_id": "63bfd939aee4a000ad9c7fdf",
          "user": "63b8162ba7d9f77120487878",
          "title": "jaydip",
          "description": "hi how are you",
          "tag": "demo",
          "date": "2023-01-12T09:56:09.097Z",
          "__v": 0
        },
        {
          "_id": "63bfd939aee4a000ad9c7fdf",
          "user": "63b8162ba7d9f77120487878",
          "title": "jaydip",
          "description": "hi how are you",
          "tag": "demo",
          "date": "2023-01-12T09:56:09.097Z",
          "__v": 0
        },
        {
          "_id": "63bfd939aee4a000ad9c7fdf",
          "user": "63b8162ba7d9f77120487878",
          "title": "jaydip",
          "description": "hi how are you",
          "tag": "demo",
          "date": "2023-01-12T09:56:09.097Z",
          "__v": 0
        }
      ]
      const [notes , setNotes] = useState(notesInitial)


    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
} ;

export default NoteState;