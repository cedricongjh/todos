import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'

interface RegistrationForm {
    email: string,
    password: string,
    confirmPassword: string
}

const Register: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
    ({setLoggedIn}) => {

    const registerValidation = yup.object().shape({
        email: yup.string().email('Please enter a valid email.').required('Email required.'),
        password: yup.string().min(8, "Your password needs to be at least 8 characters long.").required('Password required.'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords do not match")
    })

    const [form, setForm] = useState<RegistrationForm>({'email': '', 'password': '', 'confirmPassword': ''})
    const [errors, setErrors] = useState<RegistrationForm>({'email': '', 'password': '', 'confirmPassword': ''})
    const [focus, setFocus] = useState({'email': false, 'password': false, 'confirmPassword': false})
    const [disabled, setDisabled] = useState(true)
    

    const updateForm = (e :React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
        registerValidation.validate({...form, [e.target.name]: e.target.value}, { abortEarly: false }).then(() => 
            {
              setErrors({'email': '', 'password': '', 'confirmPassword': ''})
              setDisabled(false)
            }).catch(err => {
            if (err && err.inner) {
                console.log(err)
                console.log(form)
                const newErrors: RegistrationForm = {'email': '', 'password': '', 'confirmPassword': ''}
                const errs = err.inner
                errs.forEach((error: {path: 'email'|'password'|'confirmPassword', message: string}) => {
                    if (newErrors[error.path] === '') {
                      newErrors[error.path] = error.message
                    }
                  })
                setErrors({...newErrors})
            }
            setDisabled(true)
        })     
    }

    const updateFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus({...focus, [e.target.name]: true})
    } 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        axios.post('/users', {...form}).then(resp => {
            if (resp.data.status === "SUCCESS") {
                setLoggedIn(true)
            }
        }).catch((error: any) => {
            const newErrors: RegistrationForm = {'email': '', 'password': '', 'confirmPassword': ''}
            const errors: RegistrationForm = error.response.data.data
            let k: keyof typeof newErrors
            for (k in newErrors) {
                newErrors[k] = errors[k] ? k + ' ' + errors[k][0] : ''
            }
            setErrors({...newErrors})
        })
    }

    return (
    <div>
        <div>
            <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email: </label>
            <input type="text" 
                   name="email" 
                   placeholder="Enter your email" 
                   value={form.email} 
                   onChange={updateForm} 
                   onFocus={updateFocus} />
            <p>{focus.email ? errors.email : null}</p>

            <label htmlFor="password">Password: </label>
            <input type="password" 
                   name="password" 
                   placeholder="Enter your password" 
                   value={form.password} 
                   onChange={updateForm} 
                   onFocus={updateFocus}/>
            <p>{focus.password ? errors.password : null}</p>

            <label htmlFor="password">Confirm Password: </label>
            <input type="password" 
                   name="confirmPassword" 
                   placeholder="Enter your password again." 
                   value={form.confirmPassword} 
                   onChange={updateForm} 
                   onFocus={updateFocus}/>
            <p>{focus.confirmPassword ? errors.confirmPassword : null}</p>

            <button disabled={disabled}>Register</button>

            </form>
        </div>
        <div>Already have an account? <Link to="/login">login here</Link></div>
    </div>
    )


}


export default Register