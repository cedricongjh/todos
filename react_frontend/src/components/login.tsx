import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { IconContext } from 'react-icons'
import { FiLogIn } from 'react-icons/fi'

const Login: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> 
    
    = ({setLoggedIn}) => {
  
    const [form, setForm] = useState({'email': '', 'password': ''})

    const updateForm = (e :React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    <div className="login-container">
      <div className="login-card">
          <h3>Welcome!</h3>
          <div>
            <form>
                <div className="login-field-container">
                  <input type="text" name="email" placeholder="Email" value={form.email} onChange={updateForm} />
                </div>
                <div className="login-field-container">
                  <input type="password" name="password" placeholder="Password" value={form.password} onChange={updateForm}/>
                </div>
                <div className="login-button-container">
                  <div className="login-icon" onClick={e => {handleSubmit(e)}}>
                  Login
                    <IconContext.Provider value={{ className: "menu-icon-logo" }} >
                      <FiLogIn />
                    </IconContext.Provider>
                  </div>
                </div>
            </form>
          </div>
          <div>Don't have an account? <Link to="/register">Register Here</Link></div>
      </div>
    </div>    
    )
}

export default Login
