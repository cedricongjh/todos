import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'

// color picker component from react-color
const ColorPicker: React.FC = () => {

    const [color, setColor] = useState<string>("#000")
    const [show, setShow] = useState<boolean>(false)

    return(
        <div>
          <div className="color-picker-button-swatch" onClick = {() => {setShow(!show)}} >
            <div className="color-picker-button-color" style={{backgroundColor: color}} />
          </div>
          { show ? <div className="color-picker-button-popover">
          <div className="color-picker-button-cover" onClick={() => setShow(false) }/>
          <TwitterPicker color={ color } onChange={ (color) => {setColor(color.hex)} } />
        </div> : null }
        </div>
    )
}


export default ColorPicker
