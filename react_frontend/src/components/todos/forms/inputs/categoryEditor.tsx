import React from 'react'
import { Category } from '../../../../interfaces/todo.interfaces'
import ColorPicker from './colorPicker'

const CategoryEditor: React.FC<{category: Category, handleUpdateCategory(category: Category): void}> = ({category, handleUpdateCategory}) => {

    return(
        <div>
            {category.id ? <div>{category.name}</div> : <input value={category.name} onChange={e => handleUpdateCategory({...category, name: e.target.value})}></input>}
            <ColorPicker handleUpdateCategory={handleUpdateCategory} color={category.color ? category.color : ''} category={category}/>
        </div>
    )

}

export default CategoryEditor
