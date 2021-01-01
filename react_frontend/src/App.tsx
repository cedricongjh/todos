import React, { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios'

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo>({text: '', id: todos.length + 1, category: '', due: '', completed: false})

  interface Todo {
    text: string
    id: number
    category?: string
    due?: string
    completed: boolean
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    axios.post('/todos', {'text': todo.text, 'completed': todo.completed, 'due': todo.due, 'category': todo.category}).then((resp: any) => {
      console.log(resp)
      setTodos([...todos, todo])
      setTodo({text: '', id: todos.length + 1, category: '', due: '', completed: false})
    })
  }

  useEffect(() => {
    axios.get('/todos').then((resp: any) => {
      console.log(resp)
      setTodos(resp.data.data)
    })
  }, [])

  return (
  <div>
    <div>TODO CATEGORY DUE</div>
    {todos.map(todo => <div key={todo.id}>{todo.text} {todo.category} {todo.due}</div>)}
    <form onSubmit={handleSubmit}>
      <input type="checkbox" checked={todo.completed} onChange={e => setTodo({...todo, completed: e.target.checked})}/>
      <input placeholder="Enter a todo here" value={todo.text} onChange={e => setTodo({...todo, text: e.target.value})} />
      <input placeholder="Enter a category here" value={todo.category} onChange={e => setTodo({...todo, category: e.target.value})} />
      <input placeholder="Enter a due date here" value={todo.due} onChange={e => setTodo({...todo, due: e.target.value})} />
      <button>ADD</button>
    </form>
  </div>
  )
}

export default App;
