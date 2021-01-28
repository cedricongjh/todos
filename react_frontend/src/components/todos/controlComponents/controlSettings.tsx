import React, { useState } from 'react'

import { IconContext } from 'react-icons'
import { FiX, FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

import Select from 'react-select'
import CategoryEditor from '../forms/inputs/categoryEditor'

import { Todo, Category } from '../../../interfaces/todo.interfaces'

const ControlSettings: React.FC<
  {
    categories: Category[]
    handleCreateCategory(category: string, color?: string, todo?: Todo): void
    handleUpdateCategory(category: Category): void
    handleDeleteCategory(category: Category): void
    handleChangeSortOrder(value: boolean): void
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
    dateOrder: boolean
  }> 
  = ({categories, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, setShowSettings, dateOrder, handleChangeSortOrder}) => {

  const [showNew, setShowNew] = useState(false)
  const [newCategory, setNewCategory] = useState<Category>({ name: '', color: '' })

  return (
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
    </div>
  )
}

export default ControlSettings
