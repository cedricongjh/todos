import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable'

interface State {
  isLoading: boolean
}

interface Props {
  options: Array<Object>
  handleChange(value: any):void
  value: String | undefined
}

export default class CategorySelector extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }
  // handleCreate = (inputValue: any) => {
  //   this.setState({ isLoading: true })
  //   this.setState({
  //     isLoading: false,
  //     value: newOption
  //   })
  // }
  render() {
    const { isLoading } = this.state
    return (
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.props.handleChange}
        // onCreateOption={this.handleCreate}
        options={this.props.options}
        value={this.props.value}
        placeholder="Select a category"
      />
    )
  }
}