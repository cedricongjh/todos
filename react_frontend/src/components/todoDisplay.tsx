import React from 'react'



const TodoDisplay: React.FC<{todo: any, handleUpdate: ((todo: any, property: string, newValue: any, submit: Boolean) => void)}> = ({todo, handleUpdate}) => {

    return (
    <div className="todo-list-row"> 
      <input type="checkbox" checked={todo.completed} onChange={e => handleUpdate(todo, 'completed', e.target.checked, true)}/>
      <div>{todo.text}</div>
      <div>{todo.category}</div>
      <div>{todo.due}</div>  
    </div>)

}


export default TodoDisplay
