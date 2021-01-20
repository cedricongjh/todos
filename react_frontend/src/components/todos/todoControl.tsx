import React, { useState } from 'react'
import DateRange from './forms/inputs/dateRange'
import MultiCategorySelector from './forms/inputs/multiCategorySelector'
import { Todo, Category } from '../../interfaces/todo.interfaces'

const TodoControl: React.FC<{todos: Todo[], categories: Category[]}> = 
    
    ({todos, categories}) => {

    const [options, setOptions] = useState({completed: false, categories: [], fromDate: '', toDate: ''})

    const categoryOptions = categories.map((category: any) => {return {value: category.name, label: category.name}})

    return(
      <div>
        <div>Filter by:</div>
        <div>
            <label>Hide completed</label>
            <input type="checkbox" 
                   checked={options.completed} 
                   onChange={e => setOptions({...options, completed: e.target.checked   })}/>
        </div>
        <div>
            <label>Category</label>
            <MultiCategorySelector
                placeholder='Select categories to show' 
                options={categoryOptions} 
                value={options.categories}
                handleChange={(value: any) => setOptions({...options, categories: value})}/>
        </div>
        <div>
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
      </div>
    ) 

} 


export default TodoControl
