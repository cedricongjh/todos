import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable'

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
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.props.handleChange}
        onCreateOption={newCategory => this.handleCreate(newCategory)}
        options={this.props.options}
        value={this.props.selected}
        placeholder="Select a category"
      />
    )
  }
}