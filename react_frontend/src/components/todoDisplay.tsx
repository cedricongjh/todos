import React from 'react'



const TodoDisplay: React.FC<{todo: any, handleUpdate: ((todo: any, property: string, newValue: any, submit: Boolean) => void)}> = ({todo, handleUpdate}) => {

    return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={e => handleUpdate(todo, 'completed', e.target.checked, true)}/>
      {todo.text} {todo.category} {todo.due}
    </div>)

}


export default TodoDisplay
