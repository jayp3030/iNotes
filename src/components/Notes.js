import React , {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(noteContext);
    const {notes,setNotes} = context;

  return (
    <div>
      <div className="row my-3">
       <h2 className='text-center'>Your Notes</h2>
       {notes.map((notes)=>{
        return <Noteitem notes={notes}/>
       })}
      </div>
    </div>
  )
}

export default Notes
