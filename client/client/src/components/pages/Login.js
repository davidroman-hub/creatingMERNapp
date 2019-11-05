import React, {useState} from 'react'
import {Link} from 'react-router-dom'


const Login = () => {
    
    const [user, setUser] = useState({
        email: '',
        password: ''
      })
      const { email, password } = user
  
      const handleChange = e => {
          setUser({ ...user, [e.target.name]:e.target.value })
      }
  
      const submit = e => {
          e.preventDefault()
             console.log({ email, password})   
      }

    return (
        <div className='register'>
            <h1> Login</h1>
            <form onSubmit ={submit} >
                <input type='email' name='email' placeholder='Email' value={email} onChange={handleChange} />
                <input type='password' name='password' placeholder='Password' value={password} onChange={handleChange}/>
                <input type='submit' value='Sign Ip' className='btn'/>
            </form>
            <div className='question'>
                <p> Alredy have an account? {''}<Link to ='/register'>Sign Up</Link> </p>
            </div>
        </div>
    )
}

export default Login
