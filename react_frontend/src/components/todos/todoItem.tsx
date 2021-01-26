import React, { useEffect, useState } from 'react'
import TodoForm from './forms/todoForm'

const TodoItem: React.FC<
  {todo: any
   index: number
   categories: any[]
   setSaving: React.Dispatch<React.SetStateAction<boolean>> 
   handleSubmit: ((payload: any) => void)
   handleUpdate: ((todo: any, property: string, newValue: any) => void)
   handleDelete: ((payload: any) => void)
   createCategory: ((name: string, todo: any) => void)  
   }> = 

    ({todo, handleSubmit, handleUpdate, handleDelete, createCategory, categories, index, setSaving}) => {

    const [edit, setEdit] = useState<Boolean>(false)

    useEffect(() => {
      todo.id ? setEdit(false) : setEdit(true)    
    }, [todo.id])

    return(
    <div>
      <TodoForm
        todo={todo}
        setEdit={setEdit} 
        categories={categories} 
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        createCategory={createCategory}
        setSaving={setSaving}
        index={index}
      /> 
    </div>
    )

}

export default TodoItem
