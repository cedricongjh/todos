import React, { useState } from 'react'
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
          <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={form.email} onChange={updateForm} />
            <input type="password" name="password" value={form.password} onChange={updateForm}/>
            <button>LOGIN</button>
          </form>
      </div>    
    )
}

export default Login
