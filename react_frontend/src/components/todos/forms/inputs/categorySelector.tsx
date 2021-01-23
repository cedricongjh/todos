import React, { Component } from 'react'
import chroma from 'chroma-js'
import CreatableSelect from 'react-select/creatable'
import { StylesConfig } from 'react-select'

interface State {
  isLoading: boolean
}

interface Props {
  options: Array<Object>
  handleChange(value: any):void
  createCategory(name: string, todo: any):void
  value: String | undefined
  selected: Object | undefined
  todo: any
}

// styles object to style the react-select input (taken from react-select documentation)
const colourStyles: StylesConfig<any, false> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
      },
    }
  },
  singleValue: (styles, { data }) => ({ ...styles, backgroundColor: chroma(data.color ? data.color : '#ccc').alpha(0.3).css() }),
}

export default class CategorySelector extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }
  
  handleCreate(newCategory: string) {
    this.setState({isLoading: true})
    this.props.createCategory(newCategory, this.props.todo)
    this.setState({isLoading: false})
  }

  render() {
    const { isLoading } = this.state
    return (
      <CreatableSelect
        className="todo-list-category-input"
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.props.handleChange}
        onCreateOption={newCategory => this.handleCreate(newCategory)}
        options={this.props.options}
        value={this.props.selected}
        styles={colourStyles}
        placeholder={isLoading ? "creating..." : "Select a category"}
      />
    )
  }
}