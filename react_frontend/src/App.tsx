import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [todos, setTodos] = useState([{id : 0, text: 'Learn Typescript'}, {id : 1, text: 'Cook Dinner'}])
  const [input, setInput] = useState('')

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    setTodos([...todos, {text: input, id: todos.length - 1}])
    setInput('')
  }

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
