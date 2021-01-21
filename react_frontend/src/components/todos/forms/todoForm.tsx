import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import CategorySelector from './inputs/categorySelector'
import { Todo, Category } from '../../../interfaces/todo.interfaces'

const TodoForm: React.FC<{
  handleSubmit: ((payload: any) => void), 
  handleDelete: ((payload: any) => void), 
  createCategory: ((name: string, todo: any)=> void), 
  categories: Category[], 
  todo: Todo, 
  handleUpdate: ((todo: Todo, property: string, newValue: any) => void), 
  setEdit: any}> =
 
    ({handleSubmit, handleDelete, createCategory, categories, todo, handleUpdate, setEdit}) => {

    const categoryOptions = categories.map((category: any) => {return {value: category.name, label: category.name}})

    const sumbitForm = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      handleSubmit(todo)
    }

    return(

        <form
          className="todo-list-row" 
          onSubmit={evt => sumbitForm(evt)}
        >

          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={e => handleUpdate({...todo}, 'completed', e.target.checked)}/>

          <input 
            placeholder="Enter a todo here" 
            value={todo.text} 
            onChange={e => handleUpdate({...todo}, 'text', e.target.value)} />

          <CategorySelector 
            options={categoryOptions}
            todo={todo} 
            value={todo.category}
            selected={todo.category ? categoryOptions.find((category: any) => category.value === todo.category) : ''}
            handleChange={value => value ? handleUpdate({...todo}, 'category', value.value) : handleUpdate({...todo}, 'category', '')}
            createCategory={createCategory} />

          <DayPickerInput 
            value={todo.due} 
            format="YYYY-MM-DD" 
            placeholder="Click to select a date"
            inputProps={{readOnly: true}} 
            onDayChange={(day: Date) => handleUpdate({...todo}, 'due', day.toDateString())}/>
          
          <div>

          {todo.id ? <button type="button" onClick={() => handleDelete(todo)}>DELETE</button> : <button>SAVE</button>}
          </div>

        </form>
    )

}

export default TodoForm
