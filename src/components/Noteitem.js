import React from 'react'

function NoteItem(props) {
    const {notes}= props;
  return (
    <div className='col-md-4'>
      <div className="card my-2" >
        <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <p className="card-text">{notes.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae illo vitae impedit. Porro itaque numquam sequi unde ducimus minus?</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
