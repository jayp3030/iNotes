import React from 'react'
import Notes from './Notes'



function Home() {

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Write Here"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div> 

      <Notes/>
      
    </div>
  )
}

export default Home
