import React from 'react'



const TodoDisplay: React.FC<{
    todo: any, 
    handleUpdate: ((todo: any, property: string, newValue: any) => void),
    setEdit: React.Dispatch<React.SetStateAction<Boolean>>
    }> = ({todo, handleUpdate, setEdit}) => {

    const activateEdit = () => {
      setEdit(true)
    }

    return (
    <div className="todo-list-row"> 
      <input type="checkbox" 
             checked={todo.completed} 
             onChange={e => handleUpdate(todo, 'completed', e.target.checked)}
      />
        <div onClick={() => activateEdit()}>{todo.text}</div>
        <div onClick={() => activateEdit()}>{todo.category}</div>
        <div onClick={() => activateEdit()}>{todo.due}</div>
    </div>)

}


export default TodoDisplay
