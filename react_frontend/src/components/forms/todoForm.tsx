import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { getEnabledCategories } from 'trace_events'
import CategorySelector from './inputs/categorySelector'

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

const TodoForm: React.FC<{handleSubmit: ((event: React.FormEvent<HTMLFormElement>, payload: Todo) => void), categories: Category[]}> = (props) => {

    const [todo, setTodo] = useState<Todo>({text: '', category: '', due: '', completed: false})

    return(
        <form onSubmit={evt => props.handleSubmit(evt, todo)}>

          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={e => setTodo({...todo, completed: e.target.checked})}/>

          <input 
            placeholder="Enter a todo here" 
            value={todo.text} 
            onChange={e => setTodo({...todo, text: e.target.value})} />

          <CategorySelector 
            options={props.categories.map(category => {return {value: category.name, label: category.name}})} 
            value={todo.category}
            handleChange={value => setTodo({...todo, category: value.name})} />

          <DayPickerInput 
            value={todo.due} 
            format="YYYY-MM-DD" 
            placeholder="Click to select a date"
            inputProps={{readOnly: true}} 
            onDayChange={(day: Date) => setTodo({...todo, due: day.toDateString()})}/>
          <button>ADD</button>

        </form>
    )

}

export default TodoForm
