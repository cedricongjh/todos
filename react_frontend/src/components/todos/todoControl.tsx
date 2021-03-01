import React, { useEffect, useState } from 'react'

import ControlMenu from './controlComponents/controlMenu'
import ControlFilter from './controlComponents/controlFilter'
import ControlSettings from './controlComponents/controlSettings'

import useLocalStorage from '../../utils/useLocalStorage'
import { filterTodos } from '../../utils/filterTodos'
import { Todo, Category } from '../../interfaces/todo.interfaces'

const TodoControl: React.FC<
  {
    todos: Todo[]
    categories: Category[]
    filter: boolean
    dateOrder: boolean
    saving: boolean
    setDisplayedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    handleCreateCategory(category: string, color?: string, todo?: Todo): void
    handleUpdateCategory(category: Category): void
    handleDeleteCategory(category: Category): void
    handleChangeSortOrder(value: boolean): void
    handleLogout(): void
  }
> =

  ({ todos, categories, filter, dateOrder, saving, setDisplayedTodos, handleUpdateCategory, handleCreateCategory, handleDeleteCategory, handleChangeSortOrder, handleLogout }) => {

    const [options, setOptions] = useLocalStorage('filterSettings', { completed: true, categories: [], fromDate: '', toDate: '', searchStr: '', hideNoDate: false })

    const categoryOptions = categories.map((category: any) => { return { value: category.id, label: category.name, color: category.color } })

    // filter todos based on options form
    useEffect(() => {

      setDisplayedTodos(filterTodos(todos, options))

    }, [filter, options, todos, setDisplayedTodos])

    // hooks for toggling filters
    const [showFilter, setShowFilter] = useState(false)

    // hooks for toggling settings
    const [showSettings, setShowSettings] = useState(false)

    return (
      <div>

        <ControlMenu
          saving={saving}
          options={options}
          setOptions={setOptions}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          handleLogout={handleLogout}
        />

        {showSettings ?
          <ControlSettings
            categories={categories}
            handleCreateCategory={handleCreateCategory}
            handleUpdateCategory={handleUpdateCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleChangeSortOrder={handleChangeSortOrder}
            setShowSettings={setShowSettings}
            dateOrder={dateOrder}
          /> : null}

        {showFilter ? 
          <ControlFilter
            options={options}
            setOptions={setOptions}
            setShowFilter={setShowFilter}
            categoryOptions={categoryOptions} 
          /> : null}
      </div>
    )

  }


export default TodoControl
