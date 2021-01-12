import React, { useEffect, useState } from 'react'
import TodoForm from './forms/todoForm'
import TodoDisplay from './todoDisplay'

const TodoItem: React.FC<
  {todo: any, 
   handleSubmit: ((payload: any) => void), 
   handleUpdate: ((todo: any, property: string, newValue: any, submit: Boolean) => void), 
   handleDelete: ((payload: any) => void), 
   createCategory: ((name: string, todo: any) => void), 
   categories: any[]}> = 

    ({todo, handleSubmit, handleUpdate, handleDelete, createCategory, categories}) => {

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
            handleDelete={handleDelete}
            createCategory={createCategory}
          /> 
        : <TodoDisplay
            todo={todo}
            handleUpdate={handleUpdate} 
          />}
    </div>
    )

}


export default TodoItem
