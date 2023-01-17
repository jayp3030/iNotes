import React , {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(noteContext);
    const {notes,addNote} = context;

  return (
    <div>
      <Addnote/>
      <div className="row my-3">
       <h2 className='text-center'>Your Notes</h2>
       {notes.map((notes)=>{
        return <Noteitem key={notes._id} notes={notes}/>
       })}
      </div>
    </div>
  )
}

export default Notes
