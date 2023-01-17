import React , {useContext , useState} from 'react'
import noteContext from '../contexts/notes/noteContext';
import '../styles/extra.css'


function Addnote() {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title:'' , description:'',tag:'default'})
    
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title , note.description, note.tag );
    }

    const onChange =(e)=>{
        setNote({...note , [e.target.name] : e.target.value})
    }

  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' placeholder="Write Here" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description' rows="6" onChange={onChange}></textarea>
          </div>
          <div className="mb-3">
            <button type="button" className="btn-hero" onClick={handleClick}>Add Note</button>
          </div>
        </form>
      </div> 
  )
}

export default Addnote
