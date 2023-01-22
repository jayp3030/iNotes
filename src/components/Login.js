import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function Login(props) {

    const [credentials , setCredentials] = useState({email:"" , password:""});
    let navigate = useNavigate();
    

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method : 'POST',
            headers :{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email ,password : credentials.password})
          });
            const json = await response.json();
        

           

            if (json.succes) {
                //save the auth-token and  redirect
                
                localStorage.setItem('token' , json.authtoken);
                navigate("/");
                props.showAlert('Logged In','success')
            }
            else{
                props.showAlert('Enter valid credentials','danger')
            }
    }

    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value});
      }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.emailemail} id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.passwordpassword} id="password" name='password' onChange={onChange}/>
            </div>
            <button type="submit" className="btn-hero" >Log In</button>
        </form>
    </div>
  )
}

export default Login
