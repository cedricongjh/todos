import React, { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios'

const App = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  interface Todo {
    text: string
    id: number
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    setTodos([...todos, {text: input, id: todos.length - 1}])
    setInput('')
  }

  useEffect(() => {
    axios.get('/todos').then((resp: any) => {
      console.log(resp)
      setTodos(resp.data.data)
    })
  }, [])

  return (
  <div>
    {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    <form onSubmit={handleSubmit}>
      <input placeholder="Enter a todo here" value={input} onChange={e => setInput(e.target.value)}>
      </input>
      <button>ADD</button>
    </form>
  </div>
  )
}

export default App;
