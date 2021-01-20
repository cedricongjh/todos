import React from 'react'
import Select from 'react-select'

// this component was creaed using react-select

const MultiCategorySelector: React.FC<{options: any, value: any, handleChange: any, placeholder: string}> = 
    
    ({options, value, handleChange, placeholder}) => {

    return(
      <Select
        isMulti
        name="categories"
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={handleChange}
      />
    )
}

export default MultiCategorySelector
