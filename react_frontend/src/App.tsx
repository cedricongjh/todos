import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import TodoList from './components/todos/todoList'
import Login from './components/login'
import Register from './components/register'

const App: React.FC = () => {

  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err.response.status === 401) {
      setLoggedIn(false)
    }
    return Promise.reject(err)
  })

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  axios.defaults.withCredentials = true
  
  useEffect(() => {
    setLoading(true)
    axios.get('/logged_in').then(resp => {
      if (resp.data.status === "SUCCESS") {
        setLoggedIn(true)
      }
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    }).finally(() => {
      setLoading(false)
  })
  }, [])

  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <TodoList setLoggedIn={setLoggedIn}/> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to="/" /> : <Login setLoggedIn={setLoggedIn} loading={loading} setLoading={setLoading} />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/" /> : <Register setLoggedIn={setLoggedIn} loading={loading} setLoading={setLoading} />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
