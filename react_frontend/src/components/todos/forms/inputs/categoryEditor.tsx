import React from 'react'
import { Category } from '../../../../interfaces/todo.interfaces'
import ColorPicker from './colorPicker'

const CategoryEditor: React.FC<{category: Category, handleUpdateCategory(category: Category): void}> = ({category, handleUpdateCategory}) => {

    return(
        <div>
            <div>{category.name}</div>
            <ColorPicker handleUpdateCategory={handleUpdateCategory} color={category.color ? category.color : ''} category={category}/>
        </div>
    )

}

export default CategoryEditor
