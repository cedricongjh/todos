import React, { useState } from 'react'
import axios from 'axios'

const Register: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
    ({setLoggedIn}) => {

    const [form, setForm] = useState({'email': '', 'password': '', 'confirmPassword': ''})

    const updateForm = (e :React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('/users', {...form}).then(resp => {
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
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" placeholder="Enter your email" value={form.email} onChange={updateForm} />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={updateForm}/>
          <label htmlFor="password">Confirm Password: </label>
          <input type="password" name="confirmPassword" placeholder="Enter your password" value={form.confirmPassword} onChange={updateForm}/>
          <button>Register</button>
        </form>
    </div>
    )


}


export default Register