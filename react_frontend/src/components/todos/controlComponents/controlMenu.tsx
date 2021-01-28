import React from 'react'
import { IconContext } from 'react-icons'
import { FiCheckSquare, FiFilter, FiLogOut, FiRefreshCw, FiSearch, FiSettings } from 'react-icons/fi'

const ControlMenu: React.FC<
  {saving: boolean
   options: any
   setOptions: any
   showFilter: boolean
   setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
   showSettings: boolean
   setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
   handleLogout(): void}> 

  = ({saving, options, setOptions, showFilter, setShowFilter, showSettings, setShowSettings, handleLogout}) => {

  return( 
  <div className="menu">
    <div className="menu-header">
    <div className="menu-header-container">
      <h2 style={{marginRight: '5px'}}>Welcome to your to-do list</h2>
      {saving 
      ? <IconContext.Provider value={{ className: "menu-search-icon menu-refresh-icon" }} >
          <FiRefreshCw />
        </IconContext.Provider>
      : <IconContext.Provider value={{ className: "menu-search-icon" }} >
          <FiCheckSquare/>
        </IconContext.Provider>}
    </div>
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
    <div onClick={() => { setShowFilter(!showFilter) }} className="menu-icon menu-icon-top">
      Filters
      <IconContext.Provider value={{ className: "menu-icon-logo" }}>
        <FiFilter />
      </IconContext.Provider>
    </div>

    <div onClick={() => { setShowSettings(!showSettings) }} className="menu-icon menu-icon-top">
      Settings
      <IconContext.Provider value={{ className: "menu-icon-logo" }}>
        <FiSettings />
      </IconContext.Provider>
    </div>

    <div onClick={handleLogout} className="menu-icon menu-icon-top">
      Logout
      <IconContext.Provider value={{ className: "menu-icon-logo" }} >
        <FiLogOut />
      </IconContext.Provider>
    </div>

    </div>
  </div>)

}


export default ControlMenu
