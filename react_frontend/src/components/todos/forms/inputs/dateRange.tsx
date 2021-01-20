import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { dateConverter } from '../../../../utils/dateConverter'

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

      <DayPickerInput 
        value={fromDate}
        format={format} 
        inputProps={{readOnly: true}}
        placeholder={fromPlaceholder}
        onDayChange={(day: Date) => {setOptions({...currentOptions, fromDate: day.toDateString()})}}
        dayPickerProps={{modifiers: selectedModifiers, disabledDays: disabledfromDays}} />

      <DayPickerInput 
        value={toDate}
        format={format} 
        inputProps={{readOnly: true}}
        placeholder={toPlaceholder}
        onDayChange={(day: Date) => {setOptions({...currentOptions, toDate: day.toDateString()})}}
        dayPickerProps={{modifiers: selectedModifiers, disabledDays: disabledtoDays}} />
        
    </div>
  )

}

export default DateRange
