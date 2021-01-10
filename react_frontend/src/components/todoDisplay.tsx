import React, { useState } from 'react'



const TodoDisplay: React.FC<{todo: any, handleUpdate: any}> = ({todo, handleUpdate}) => {

    return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={e => handleUpdate(todo, e.target.checked)}/>
      {todo.text} {todo.category} {todo.due}
    </div>)

}


export default TodoDisplay
