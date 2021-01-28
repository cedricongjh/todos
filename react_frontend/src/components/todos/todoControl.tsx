import React, { useEffect, useState } from 'react'

import ControlMenu from './controlComponents/controlMenu'
import ControlSettings from './controlComponents/controlSettings'

import useLocalStorage from '../../utils/useLocalStorage'
import { dateConverter } from '../../utils/dateHandling'
import { Todo, Category } from '../../interfaces/todo.interfaces'
import ControlFilter from './controlComponents/controlFilter'

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

    const [options, setOptions] = useLocalStorage('filterSettings', { completed: true, categories: [], fromDate: '', toDate: '', searchStr: '' })

    const categoryOptions = categories.map((category: any) => { return { value: category.id, label: category.name, color: category.color } })

    // filter todos based on options form
    useEffect(() => {

      let newTodos = todos.filter(todo => {
        if (!todo.id) {
          return true
        }

        if (options.completed) {
          if (!todo.completed) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })

      newTodos = newTodos.filter(todo => {
        if (!todo.id) {
          return true
        }

        if (options.categories && options.categories.length > 0) {
          if (todo.category_id && options.categories.includes(todo.category_id)) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })

      newTodos = newTodos.filter(todo => {
        if (!todo.id) {
          return true
        }

        if (options.toDate || options.fromDate) {
          if (todo.due) {
            if (options.toDate && options.fromDate) {
              if (dateConverter(options.fromDate) <= dateConverter(todo.due) && dateConverter(todo.due) <= dateConverter(options.toDate)) {
                return true
              } else {
                return false
              }
            } else if (options.fromDate) {
              if (dateConverter(options.fromDate) <= dateConverter(todo.due)) {
                return true
              } else {
                return false
              }
            } else {
              if (dateConverter(todo.due) <= dateConverter(options.toDate)) {
                return true
              } else {
                return false
              }
            }
          } else {
            return false
          }
        } else {
          return true
        }
      })

      newTodos = newTodos.filter(todo => {
        if (options.searchStr !== '') {
          if (todo.id) {
            if (todo.text.toLowerCase().search(options.searchStr.toLowerCase()) >= 0) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        } else {
          return true
        }
      })

      setDisplayedTodos([...newTodos])

    }, [filter, options.completed, options.categories, options.toDate, options.fromDate, options.searchStr, todos, setDisplayedTodos])

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
