import React,{useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';


function NoteItem(props) {
    const {notes}= props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const dltNote=()=>{
      deleteNote(notes._id)
    }
  return (
    <div className='col-md-4'>
      <div className="card my-2" >
        <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <p className="card-text">{notes.description}</p>

            <i className="fa fa-pen-to-square mx-2 fs-5" ></i>
            <i className='far fa-trash-alt mx-2 fs-5' onClick={dltNote}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
