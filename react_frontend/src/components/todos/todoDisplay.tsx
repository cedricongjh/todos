import React from 'react'
import chroma from 'chroma-js'
import { Todo, Category } from '../../interfaces/todo.interfaces'


const TodoDisplay: React.FC<{
    todo: Todo,
    categories: Category[], 
    handleUpdate: ((todo: any, property: string, newValue: any) => void),
    setEdit: React.Dispatch<React.SetStateAction<Boolean>>
    }> = ({todo, handleUpdate, setEdit, categories}) => {

    const activateEdit = () => {
      setEdit(true)
    }

    const category = categories.find(category => category.id === todo.category_id)
    const color = category?.color ? chroma(category.color) : chroma('#ccc')

    return (
    <div className="todo-list-row"> 
      <input type="checkbox" 
             checked={todo.completed} 
             onChange={e => handleUpdate(todo, 'completed', e.target.checked)}
      />
        <div className="todo-list-text-input" onClick={() => activateEdit()}>{todo.text}</div>
        <div className="todo-list-category-input" onClick={() => activateEdit()} style={ {backgroundColor: color.alpha(0.3).css()}}>{category?.name}</div>
        <div onClick={() => activateEdit()}>{todo.due}</div>
    </div>)

}


export default TodoDisplay
