import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { dateConverter } from '../../../../utils/dateHandling'

import { IconContext } from 'react-icons'
import { FiSlash } from 'react-icons/fi'

// this component was created using react-day-picker, look at their documentation for a detailed API.


// styles for dates
const highlightStyle = `.DayPicker-Day--highlighted {
  background-color: #4a90e2;
  border-radius: 0 !important;
  color: white;
}`;

const disabledStyle = `.DayPicker-Day .DayPicker-Day--disabled {
  color: gray;
}`

const rangeStyle = `.DayPicker-Day--range {
  background-color: #4a90e2;
  border-radius: 0 !important;
}`

const DateRange: React.FC<
  {toDate: string, 
   fromDate: string,
   toPlaceholder: string,
   fromPlaceholder: string,
   format: string, 
   currentOptions: Object, 
   setOptions: React.SetStateAction<any>
  }> = 
  
  ({toDate, fromDate, toPlaceholder, fromPlaceholder, currentOptions, setOptions, format}) => {
  
  // ensure to and from date is not the same before applying styling
  const range = () => {
    if (toDate === fromDate) {
      return {after: new Date(''), before: new Date('')}
    } else {
      return {after: dateConverter(fromDate), before: dateConverter(toDate)}
    }
  }

  // modifiers for styling
  const selectedModifiers = {
    highlighted: [dateConverter(fromDate), dateConverter(toDate)],
    range: range()
  }

  // to prevent user from selecting dates
  const disabledtoDays = {
    before: dateConverter(fromDate)
  }

  const disabledfromDays = {
    after: dateConverter(toDate)
  }

  return (
    <div>

      <style>
        {highlightStyle}
        {disabledStyle}
        {rangeStyle}
      </style>

      <div className="date-range-container">
        <div className="date-range-input-container">
          <DayPickerInput 
            value={fromDate}
            format={format} 
            inputProps={{readOnly: true}}
            placeholder={fromPlaceholder}
            onDayChange={(day: Date) => {setOptions({...currentOptions, fromDate: day.toISOString().substring(0, 10)})}}
            dayPickerProps={{modifiers: selectedModifiers, disabledDays: disabledfromDays}} />
        </div>

        <div className="date-range-input-container">
          <DayPickerInput 
            value={toDate}
            format={format} 
            inputProps={{readOnly: true}}
            placeholder={toPlaceholder}
            onDayChange={(day: Date) => {setOptions({...currentOptions, toDate:day.toISOString().substring(0, 10)})}}
            dayPickerProps={{modifiers: selectedModifiers, disabledDays: disabledtoDays}} />
        </div>

        <div onClick={() => {setOptions({...currentOptions, toDate: '', fromDate: ''})}} className="menu-icon filter-icon">
          clear
          <IconContext.Provider value={{className: "filter-button"}}> 
            <FiSlash />
          </IconContext.Provider>
        </div>
      </div>
        
    </div>
  )

}

export default DateRange
