import React, { useEffect, useState } from 'react'

import { IconContext } from 'react-icons'
import { FiFilter, FiSettings, FiLogOut, FiSearch, FiSlash, FiX, FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

import Select from 'react-select'
import DateRange from './forms/inputs/dateRange'
import MultiCategorySelector from './forms/inputs/multiCategorySelector'
import CategoryEditor from './forms/inputs/categoryEditor'

import useLocalStorage from '../../utils/useLocalStorage'
import { dateConverter } from '../../utils/dateHandling'
import { Todo, Category } from '../../interfaces/todo.interfaces'

const TodoControl: React.FC<
  {
    todos: Todo[]
    categories: Category[]
    filter: boolean
    dateOrder: boolean
    setDisplayedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    handleCreateCategory(category: string, color?: string, todo?: Todo): void
    handleUpdateCategory(category: Category): void
    handleDeleteCategory(category: Category): void
    handleChangeSortOrder(value: boolean): void
    handleLogout(): void
  }
> =

  ({ todos, categories, filter, dateOrder, setDisplayedTodos, handleUpdateCategory, handleCreateCategory, handleDeleteCategory, handleChangeSortOrder, handleLogout }) => {

    const [options, setOptions] = useLocalStorage('filterSettings', { completed: true, categories: [], fromDate: '', toDate: '', searchStr: '' })

    const categoryOptions = categories.map((category: any) => { return { value: category.id, label: category.name, color: category.color } })

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

    // hooks for adding categories
    const [showNew, setShowNew] = useState(false)
    const [newCategory, setNewCategory] = useState<Category>({ name: '', color: '' })

    // hooks for toggling filters
    const [showFilter, setShowFilter] = useState(false)

    // hooks for toggling settings
    const [showSettings, setShowSettings] = useState(false)

    return (
      <div>
        {/* menu component */}
        <div className="menu">
          <div className="menu-header">
            <h2>Welcome to your to-do list</h2>
            <div className="menu-search-bar">
              <IconContext.Provider value={{ className: "menu-search-icon" }} >
                <FiSearch />
              </IconContext.Provider>
              <input value={options.searchStr}
                onChange={e => setOptions({ ...options, searchStr: e.target.value })}
                placeholder="Type to search" />
            </div>
          </div>

          <div className="menu-icons">
            <div onClick={() => { setShowFilter(!showFilter) }} className="menu-icon">
              Filters
              <IconContext.Provider value={{ className: "menu-icon-logo" }}>
                <FiFilter />
              </IconContext.Provider>
            </div>

            <div onClick={() => { setShowSettings(!showSettings) }} className="menu-icon">
              Settings
              <IconContext.Provider value={{ className: "menu-icon-logo" }}>
                <FiSettings />
              </IconContext.Provider>
            </div>

            <div onClick={handleLogout} className="menu-icon">
              Logout
              <IconContext.Provider value={{ className: "menu-icon-logo" }} >
                <FiLogOut />
              </IconContext.Provider>
            </div>

          </div>

          {/* settings component */}
          {showSettings ?
            <div className="settings-modal">
              <div className="settings-content">

                <div className="settings-header">
                  <h3>Settings</h3>
                  <div onClick={e => {setShowSettings(false)}} className="menu-icon filter-icon">
                      Dismiss
                      <IconContext.Provider value={{ className: "menu-icon-logo" }} >
                        <FiX />
                      </IconContext.Provider>
                  </div>
                </div>

                <h4>Categories: </h4>

                {categories.map(category => {
                  return (<CategoryEditor
                    category={category}
                    handleUpdateCategory={handleUpdateCategory}
                    handleCreateCategory={handleCreateCategory}
                    handleDeleteCategory={handleDeleteCategory}
                    newCategory={newCategory}
                    setShowNew={setShowNew}
                    setNewCategory={setNewCategory}
                  />)
                })}

                {showNew 
                ? <div>
                    <div onClick={() => setShowNew(false)} className="menu-icon">
                      <IconContext.Provider value={{ className: "menu-icon-logo" }}>
                        <FiMinusCircle />
                      </IconContext.Provider>
                    </div>

                    <CategoryEditor
                      category={newCategory}
                      handleUpdateCategory={setNewCategory}
                      handleCreateCategory={handleCreateCategory}
                      handleDeleteCategory={handleDeleteCategory}
                      newCategory={newCategory}
                      setShowNew={setShowNew}
                      setNewCategory={setNewCategory} />
                  </div>
                : <div onClick={() => setShowNew(true)} className="menu-icon">
                    <IconContext.Provider value={{ className: "menu-icon-logo" }}>
                      <FiPlusCircle />
                    </IconContext.Provider>
                  </div>}

                <h4>Date: </h4>

                <label htmlFor="sortingOrder">Sorting order:</label>
                <Select isClearable={false}
                  name="sortingOrder"
                  options={[{ label: "Earliest date first", value: 1 }, { label: "Latest date first", value: 0 }]}
                  value={dateOrder ? { label: "Earliest date first", value: 1 } : { label: "Latest date first", value: 0 }}
                  onChange={value => value?.value ? handleChangeSortOrder(true) : handleChangeSortOrder(false)} />
              </div>
            </div> :
            null}

        </div>

        {/* filter options component */}
        {showFilter ?
          <div className="filter-container">

            <div className="filter-first-row-container">
              <div className="filter-completed-container">

                <div className="filter-hide-completed-container">
                  <label className="filter-hide-completed-label">Hide completed</label>
                  <input type="checkbox"
                    className="switch"
                    checked={options.completed}
                    onChange={e => setOptions({ ...options, completed: e.target.checked })} />
                </div>

              </div>

              <div className="filter-buttons-container">
                <div onClick={() => { setOptions({ ...options, categories: [], fromDate: '', toDate: '' }) }} className="menu-icon filter-icon">
                  Clear all
                  <IconContext.Provider value={{ className: "filter-button" }}>
                    <FiSlash />
                  </IconContext.Provider>
                </div>
                <div onClick={() => { setShowFilter(false) }} className="menu-icon filter-icon">
                  Close
                  <IconContext.Provider value={{ className: "filter-button" }}>
                    <FiX />
                  </IconContext.Provider>
                </div>
              </div>

            </div>

            <div>
              <label>Category</label>
              <MultiCategorySelector
                placeholder='Select categories to show'
                options={categoryOptions}
                value={options.categories}
                selected={options.categories ? categoryOptions.filter(category => options.categories.includes(category.value)) : []}
                handleChange={(value: any) => {
                  value && value.length > 0
                  ? setOptions({ ...options, categories: value.map((category: any) => { return category.value }) })
                  : setOptions({ ...options, categories: [] })
                }} />
            </div>
            <div className="filter-date-range-container">
              <label>Date range</label>
              <DateRange
                toDate={options.toDate}
                fromDate={options.fromDate}
                fromPlaceholder={'From'}
                toPlaceholder={'To'}
                format={'YYYY-MM-DD'}
                currentOptions={options}
                setOptions={setOptions} />
            </div>
          </div> : null}
      </div>
    )

  }


export default TodoControl
