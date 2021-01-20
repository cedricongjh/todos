import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'

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
      return {after: new Date(fromDate), before: new Date(toDate)}
    }
  }

  // modifiers for styling
  const selectedModifiers = {
    highlighted: [new Date(fromDate), new Date(toDate)],
    range: range()
  }

  // to prevent user from selecting dates
  const disabledtoDays = {
    before: new Date(fromDate)
  }

  const disabledfromDays = {
    after: new Date(toDate)
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
