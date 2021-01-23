import React, { useCallback } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'
import { Category } from '../../../../interfaces/todo.interfaces'
import ColorPicker from './colorPicker'

const CategoryEditor: React.FC<{category: Category, handleUpdateCategory(category: Category): void}> = ({category, handleUpdateCategory}) => {

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
        <div>
          <div>
            <input value={category.name} onChange={handleUpdateText}></input>
            <ColorPicker handleUpdateCategory={handleUpdateCategory} color={category.color ? category.color : ''} category={category}/>
          </div>
        </div>
    )

}

export default CategoryEditor
