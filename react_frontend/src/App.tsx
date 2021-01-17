import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import TodoList from './components/todos/todoList'
import Login from './components/login'

const App: React.FC = () => {

  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err.response.status === 401) {
      setLoggedIn(false)
    }
    return Promise.reject(err)
  })
  
  useEffect(() => {
    axios.get('/logged_in').then(resp => {
      if (resp.data.status === "SUCCESS") {
        setLoggedIn(true)
      }
    })
  }, [])

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <TodoList setLoggedIn={setLoggedIn}/> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to="/" /> : <Login setLoggedIn={setLoggedIn}/>}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
