import React, { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo>({text: '', category: '', due: '', completed: false})

  interface Todo {
    text: string
    id?: number
    category?: string
    due?: string
    completed: boolean
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    axios.post('/todos', {...todo}).then((resp: any) => {
      console.log(resp)
      setTodos([...todos, resp.data.data])
      setTodo({text: '', category: '', due: '', completed: false})
    })
  }

  const handleUpdate = (todo: Todo, checked: Boolean) => {
    axios.put(`/todos/${todo.id}`, {...todo, completed: checked}).then((resp: any) => {
      console.log(resp)
      setTodos(todos.map(ele => ele.id !== todo.id ? ele : resp.data.data))
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
    {todos.map(todo => <div key={todo.id}>
      <input type="checkbox" checked={todo.completed} onChange={e => handleUpdate(todo, e.target.checked)}/>
      {todo.text} {todo.category} {todo.due}
    </div>)}
    <form onSubmit={handleSubmit}>
      <input type="checkbox" checked={todo.completed} onChange={e => setTodo({...todo, completed: e.target.checked})}/>
      <input placeholder="Enter a todo here" value={todo.text} onChange={e => setTodo({...todo, text: e.target.value})} />
      <input placeholder="Enter a category here" value={todo.category} onChange={e => setTodo({...todo, category: e.target.value})} />
      <DayPickerInput value={todo.due} format="YYYY-MM-DD" onDayChange={(day: Date) => setTodo({...todo, due: day.toDateString()})}/>
      <button>ADD</button>
    </form>
  </div>
  )
}

export default App;
