import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> 
    
    = ({setLoggedIn}) => {
  
    const [form, setForm] = useState({'email': '', 'password': ''})

    const updateForm = (e :React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('/login', {...form}).then(resp => {
            if (resp.data.status === "SUCCESS") {
                setLoggedIn(true)
            }
        }).catch((reason: any) => {
            console.log(reason.message)
        })
    }

    return (
      <div>
          <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" placeholder="Enter your email" value={form.email} onChange={updateForm} />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={updateForm}/>
            <button>LOGIN</button>
          </form>
          </div>
          <div>Don't have an account? <Link to="/register">Register Here</Link></div>
      </div>    
    )
}

export default Login
