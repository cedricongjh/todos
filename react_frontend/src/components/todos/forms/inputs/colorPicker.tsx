import axios from 'axios'
import React, { useState } from 'react'
import { SwatchesPicker } from 'react-color'
import { Category } from '../../../../interfaces/todo.interfaces'

// color picker component from react-color
const ColorPicker: React.FC<{color: string, handleUpdateCategory(category: Category): void, category: Category}> = ({color, handleUpdateCategory, category}) => {

    const [show, setShow] = useState<boolean>(false)

    // send api request to update color
    const updateCategory = (category: Category) => {
        if (category.id) {
            axios.put(`/categories/${category.id}`, category)
            .then((resp: any) => {
                setShow(false)
            })
        } else {
            setShow(false)
        }
    }

    return(
        <div>
          <div className="color-picker-button-swatch" onClick = {() => {setShow(!show)}} >
            <div className="color-picker-button-color" style={{backgroundColor: color}} />
          </div>
          { show ? <div className="color-picker-button-popover">
          <div className="color-picker-button-cover" onClick={() => setShow(false) }/>
          <SwatchesPicker color={ color } onChangeComplete={ (color) => {updateCategory({...category, color: color.hex}); handleUpdateCategory({...category, color: color.hex})} } />
        </div> : null }
        </div>
    )
}


export default ColorPicker
