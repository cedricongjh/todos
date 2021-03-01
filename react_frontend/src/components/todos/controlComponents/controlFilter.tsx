import React from 'react'

import { IconContext } from 'react-icons'
import { FiSlash, FiX } from 'react-icons/fi'

import DateRange from '../forms/inputs/dateRange'
import MultiCategorySelector from '../forms/inputs/multiCategorySelector'

const ControlFilter: React.FC<
  {
    options: any
    setOptions: any
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
    categoryOptions: any[]
  }> 
  
  = ({options, setOptions, setShowFilter, categoryOptions}) => {


  return(
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
              : setOptions({ ...options, categories: [] })}} />
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

    <div className="filter-hide-no-date-container">
          <label className="filter-hide-no-date-label">Hide blank dates</label>
          <input type="checkbox"
            className="switch"
            checked={options.hideNoDate}
            onChange={e => setOptions({ ...options, hideNoDate: e.target.checked })} />
    </div>

  </div>
  )

}

export default ControlFilter
