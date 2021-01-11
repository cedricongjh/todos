import React, { useEffect, useState } from 'react'
import TodoForm from './forms/todoForm'
import TodoDisplay from './todoDisplay'

const TodoItem: React.FC<{todo: any, handleSubmit: any, handleUpdate: any, categories: any}> = 

    ({todo, handleSubmit, handleUpdate, categories}) => {

    const [edit, setEdit] = useState<Boolean>(false)

    useEffect(() => {
      todo.id ? setEdit(false) : setEdit(true)    
    }, [])

    return(
    <div onClick={() => setEdit(true)}>
    {edit
        ? <TodoForm
            todo={todo}
            setEdit = {setEdit} 
            categories={categories} 
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          /> 
        : <TodoDisplay
            todo={todo}
            handleUpdate={handleUpdate} 
          />}
    </div>
    )

}


export default TodoItem
