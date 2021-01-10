import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import CategorySelector from './inputs/categorySelector'

const TodoForm: React.FC<{handleSubmit: ((event: React.FormEvent<HTMLFormElement>, payload: any) => void), categories: any[], todo: any, handleUpdate: any}> =
 
    ({handleSubmit, categories, todo, handleUpdate}) => {

    const categoryOptions = categories.map((category: any) => {return {value: category.name, label: category.name}})

    return(

        <form onSubmit={evt => {handleSubmit(evt, todo)}}>

          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={e => handleUpdate({...todo}, 'completed', e.target.checked, false)}/>

          <input 
            placeholder="Enter a todo here" 
            value={todo.text} 
            onChange={e => handleUpdate({...todo}, 'text', e.target.value, false)} />

          <CategorySelector 
            options={categoryOptions} 
            value={todo.category}
            selected={todo.category === '' ? '' :categories.find((category: any) => category.value === todo.category)}
            handleChange={value => value ? handleUpdate({...todo}, 'category', value, false) : handleUpdate({...todo}, 'category', value, false)} />

          <DayPickerInput 
            value={todo.due} 
            format="YYYY-MM-DD" 
            placeholder="Click to select a date"
            inputProps={{readOnly: true}} 
            onDayChange={(day: Date) => handleUpdate({...todo}, 'due', day, false)}/>
          <button>ADD</button>

        </form>
    )

}

export default TodoForm
