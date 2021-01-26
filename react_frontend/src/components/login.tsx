import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { IconContext } from 'react-icons'
import { FiLogIn } from 'react-icons/fi'

import ClipLoader from "react-spinners/ClipLoader"

const Login: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>}> 
    
    = ({setLoggedIn, loading, setLoading}) => {
  
    const [form, setForm] = useState({'email': '', 'password': ''})
    const [error, setError] = useState('')

    const updateForm = (e :React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        axios.post('/login', {...form}).then(resp => {
            setLoading(false)
            if (resp.data.status === "SUCCESS") {
                setLoggedIn(true)
            }
        }).catch((reason: any) => {
            setLoading(false)
            setError('Incorrect Username/Password!')
        })
    }

    return (
    <div className="login-container">
      {!loading ?
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

                <div className="login-error">{error}</div>

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
      : <div className="loading-container">
          <ClipLoader />
          Loading....
        </div>}
    </div>    
    )
}

export default Login
