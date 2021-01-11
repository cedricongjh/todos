import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import CategorySelector from './inputs/categorySelector'

const TodoForm: React.FC<{handleSubmit: ((payload: any) => void), categories: any[], todo: any, handleUpdate: any, setEdit: any}> =
 
    ({handleSubmit, categories, todo, handleUpdate, setEdit}) => {

    const categoryOptions = categories.map((category: any) => {return {value: category.name, label: category.name}})

    const sumbitForm = async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      if (todo.id) {
        await handleUpdate(todo, 'text',  todo.text, true)
        setEdit(false)
      } else {
        await handleSubmit(todo)
      }
    }

    return(

        <form onSubmit={evt => sumbitForm(evt)}>

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
            selected={todo.category ? categoryOptions.find((category: any) => category.value === todo.category) : ''}
            handleChange={value => value ? handleUpdate({...todo}, 'category', value.value, false) : handleUpdate({...todo}, 'category', '', false)} />

          <DayPickerInput 
            value={todo.due} 
            format="YYYY-MM-DD" 
            placeholder="Click to select a date"
            inputProps={{readOnly: true}} 
            onDayChange={(day: Date) => handleUpdate({...todo}, 'due', day.toDateString(), false)}/>
          <button>{todo.id ? 'SAVE': 'ADD'}</button>

        </form>
    )

}

export default TodoForm
