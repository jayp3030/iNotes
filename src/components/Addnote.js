import React , {useContext , useState} from 'react'
import noteContext from '../contexts/notes/noteContext';
import '../styles/extra.css'


function Addnote(props) {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title:'' , description:'',tag:''})
    
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title , note.description, note.tag );
        setNote({title:'' , description:'',tag:''});
        props.showAlert('Added successfully' , 'success')
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
            <input type="text" className="form-control" id="title" name='title' placeholder="Add title"value={note.title} onChange={onChange} required minLength={3}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description'placeholder='Add description' rows="6" value={note.description} onChange={onChange} required minLength={5}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">tag</label>
            <textarea className="form-control" id="tag" name='tag' placeholder='Add tag' rows="1" value={note.tag} onChange={onChange}></textarea>
          </div>
          <div className="mb-3">
            <button disabled={note.title.length <3 || note.description.length<5} type="button" className="btn-hero" onClick={handleClick}>Add Note</button>
          </div>
        </form>
      </div> 
  )
}

export default Addnote
