import React from 'react'
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

    return (
    <div className="todo-list-row"> 
      <input type="checkbox" 
             checked={todo.completed} 
             onChange={e => handleUpdate(todo, 'completed', e.target.checked)}
      />
        <div className="todo-list-text-input" onClick={() => activateEdit()}>{todo.text}</div>
        <div className="todo-list-category-input" onClick={() => activateEdit()}>{categories.find(category => category.id === todo.category_id)?.name}</div>
        <div onClick={() => activateEdit()}>{todo.due}</div>
    </div>)

}


export default TodoDisplay
