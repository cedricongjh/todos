import React, { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';
import CategorySelector from './components/inputs/categorySelector';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo>({text: '', category: '', due: '', completed: false})
  const [categories, setCategories] = useState<Category[]>([])

  interface Todo {
    text: string
    id?: number
    category?: string
    due?: string
    completed: boolean
  }

  interface Category {
    id?: number
    name: string
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
      setTodos(resp.data.data)
    })
    axios.get('/categories').then((resp: any) => {
      setCategories(resp.data.data)
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
      <CategorySelector options={categories.map(category => {return {value: category.name, label: category.name}})} value={todo.category} handleChange={value => setTodo({...todo, category: value.name})} />
      <DayPickerInput value={todo.due} format="YYYY-MM-DD" placeholder="Click to select a date" onDayChange={(day: Date) => setTodo({...todo, due: day.toDateString()})}/>
      <button>ADD</button>
    </form>
  </div>
  )
}

export default App;
