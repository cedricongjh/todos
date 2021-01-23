import React from 'react'
import Select, { StylesConfig } from 'react-select'
import chroma from 'chroma-js'
import { Category } from '../../../../interfaces/todo.interfaces';

// styles object to style the react-select input (taken from react-select documentation)
const colourStyles: StylesConfig<Category, true> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    let color;
    if (data.color) {
      color = chroma(data.color)
    } else {
      color = chroma('#ccc')
    }
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      }
    }
  },
  multiValue: (styles, { data }) => {
    let color
    if (data.color) {
      color = chroma(data.color)
    } else {
      color = chroma('#ccc')
    }
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

// this component was created using react-select

const MultiCategorySelector: React.FC<{options: any, value: any, handleChange: any, placeholder: string, selected: any[]}> = 
    
    ({options, value, handleChange, placeholder, selected}) => {

    return(
      <Select
        isMulti
        name="categories"
        placeholder={placeholder}
        options={options}
        value={selected}
        onChange={handleChange}
        styles={colourStyles}
      />
    )
}

export default MultiCategorySelector
