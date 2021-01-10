import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import CategorySelector from './inputs/categorySelector'

const TodoForm: React.FC<{handleSubmit: ((event: React.FormEvent<HTMLFormElement>, payload: any) => void), categories: any[]}> = (props) => {

    const [todo, setTodo] = useState({text: '', category: '', due: '', completed: false})

    const categories = props.categories.map(category => {return {value: category.name, label: category.name}})

    return(

        <form onSubmit={async evt => {await props.handleSubmit(evt, todo)
                                      setTodo({text: '', category: '', due: '', completed: false})}}>

          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={e => setTodo({...todo, completed: e.target.checked})}/>

          <input 
            placeholder="Enter a todo here" 
            value={todo.text} 
            onChange={e => setTodo({...todo, text: e.target.value})} />

         {/* fix this component issue */}
          <CategorySelector 
            options={categories} 
            value={todo.category}
            selected={todo.category === '' ? '' :categories.find(category => category.value === todo.category)}
            handleChange={value => setTodo({...todo, category: value.value})} />

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
