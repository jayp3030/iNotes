import React , {useContext, useEffect,useState ,useRef} from 'react'
import noteContext from '../contexts/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    const [note,setNote] = useState({id:'',etitle:'' ,edescription:'',etag:''})

    useEffect(()=>{
      getNotes()
      // eslint-disable-next-line
    },[])

    const updateNote =(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag})
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick =(e)=>{
      editNote(note.id , note.etitle , note.edescription , note.etag);
      refClose.current.click();
    }

    const onChange =(e)=>{
      setNote({...note , [e.target.name] : e.target.value})
    }

  return (
    <div>
      <Addnote/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Write Here" value={note.etitle} onChange={onChange} required minLength={3}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="edescription" name='edescription' rows="6" value={note.edescription} onChange={onChange} required minLength={5}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">tag</label>
                <textarea className="form-control" id="etag" name='etag' rows="1" value={note.etag} onChange={onChange}></textarea>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length <3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Changes </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row my-3">
       <h2 className='text-center'>Your Notes</h2>
       <div className="container mx-3">
        {notes.length === 0 && 'No Notes to Display'}
       </div>
       {notes.map((notes)=>{
        return <Noteitem key={notes._id} updateNote={updateNote} notes={notes}/>
       })}
      </div>
    </div>
  )
}

export default Notes
