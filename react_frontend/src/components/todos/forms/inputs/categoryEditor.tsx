import React, { useCallback } from 'react'
import { IconContext } from 'react-icons'
import { FiTrash, FiSave } from 'react-icons/fi'
import axios from 'axios'
import { debounce } from 'lodash'
import { Category, Todo } from '../../../../interfaces/todo.interfaces'
import ColorPicker from './colorPicker'

const CategoryEditor: React.FC<
    {category: Category, 
     handleUpdateCategory(category: Category): void
     handleCreateCategory(category: string, color?: string, todo?: Todo):void
     handleDeleteCategory(category: Category): void
     newCategory?: any
     setShowNew(value: React.SetStateAction<boolean>):void
     setNewCategory(value: React.SetStateAction<any>): void
    }
    > = 
    
    ({category, handleUpdateCategory, handleCreateCategory, handleDeleteCategory, newCategory, setShowNew, setNewCategory}) => {

    // using lodash's debounce, delay put request to update category name
    const debouncedUpdate = useCallback(debounce(category => {
          axios.put(`/categories/${category.id}`, category).then((resp: any) => {
          })
    }, 1000), [])

    const handleUpdateText = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (category.id) {
            debouncedUpdate({...category, name: evt.target.value})
        }
        handleUpdateCategory({...category, name: evt.target.value})
    }

    return(
        <div className="category-editor">
          <input value={category.name} onChange={handleUpdateText}></input>
          <ColorPicker handleUpdateCategory={handleUpdateCategory} color={category.color ? category.color : ''} category={category}/>
          {category.id 
            ? <div onClick={e => handleDeleteCategory(category)}>
                  <IconContext.Provider value={{className: "menu-icon-logo"}}> 
                    <FiTrash />
                  </IconContext.Provider>
              </div>
            : <div onClick={() => {handleCreateCategory(newCategory.name, newCategory.color)
                                      setShowNew(false) 
                                      setNewCategory({name: '', color: ''})}}>
                  <IconContext.Provider value={{className: "menu-icon-logo"}}> 
                    <FiSave/>
                  </IconContext.Provider>
              </div>}
        </div>
    )

}

export default CategoryEditor
