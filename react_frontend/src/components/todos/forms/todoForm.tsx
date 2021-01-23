import React, { useCallback, useRef, useState } from 'react'
import 'react-day-picker/lib/style.css'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import CategorySelector from './inputs/categorySelector'
import TextareaAutosize from 'react-textarea-autosize'

import { debounce } from 'lodash'
import axios from 'axios'

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

    const categoryOptions = categories.map((category: any) => {return {value: category.id, label: category.name, color: category.color}})

    const sumbitForm = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      handleSubmit(todo)
      setText('')
    }

    const [text, setText] = useState(todo.text)

    const textInput = useRef(null)

    // using lodash's debounce, delay updating state and put request to update current todos
    const debouncedUpdate = useCallback(debounce(todo => {
      if (todo.id) {
        axios.put(`/todos/${todo.id}`, todo).then((resp: any) => {
          if (!(textInput.current === document.activeElement)) {
            setEdit(false)
          }
        })
      }
    }, 1000), [])

    return(
      
        <form onSubmit={evt => sumbitForm(evt)}>
          <div className="todo-list-row">
            <div className="todo-list-item">
              <input 
                type="checkbox"
                checked={todo.completed} 
                onChange={e => {handleUpdate({...todo}, 'completed', e.target.checked) 
                                debouncedUpdate({...todo, 'completed': e.target.checked})}}/>

              <TextareaAutosize
                placeholder={todo.id ? "" : "Enter a todo here"}
                className="todo-list-text-input"
                value={text}
                ref={textInput} 
                onChange={e => {setText(e.target.value)
                                if (todo.id) {
                                  debouncedUpdate({...todo, 'text': e.target.value})
                                } else {
                                  handleUpdate({...todo}, 'text', e.target.value)
                                }
                                }} />
            </div>

            <CategorySelector 
              options={categoryOptions}
              todo={todo} 
              value={todo.category_id}
              selected={todo.category_id ? categoryOptions.find((category: any) => category.value === todo.category_id) : ''}
              handleChange={value => {if (value) { handleUpdate({...todo}, 'category_id', value.value); debouncedUpdate({...todo, 'category_id': value.value}); } 
                                      else {handleUpdate({...todo}, 'category_id', ''); debouncedUpdate({...todo, 'category_id': ''}); }}}
              createCategory={createCategory} />

            <div className="todo-list-date-group">
            <DayPickerInput 
              value={todo.due} 
              format="YYYY-MM-DD" 
              placeholder="Click to select a date"
              inputProps={{readOnly: true}} 
              onDayChange={(day: Date) => {handleUpdate({...todo}, 'due', day.toDateString())
                                          debouncedUpdate({...todo, 'due': day.toDateString()})}}/>

            {todo.id ? <button onClick={e => {e.preventDefault(); handleDelete({...todo})}}>DELETE</button> : <button>SAVE</button>}
            </div>
          </div>
        </form>
    )

}

export default TodoForm
