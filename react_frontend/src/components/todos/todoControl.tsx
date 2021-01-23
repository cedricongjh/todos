import React, { useEffect, useState } from 'react'
import DateRange from './forms/inputs/dateRange'
import MultiCategorySelector from './forms/inputs/multiCategorySelector'
import CategoryEditor from './forms/inputs/categoryEditor'
import { dateConverter } from '../../utils/dateConverter'
import { Todo, Category } from '../../interfaces/todo.interfaces'

type optionsForm = {
  completed: boolean,
  categories: any[],
  fromDate: string,
  toDate: string,
  searchStr: string
}

const TodoControl: React.FC<
    {todos: Todo[], 
     categories: Category[], 
     setDisplayedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
     filter: boolean
     handleCreateCategory(category: string, color?: string, todo?: Todo): void
     handleUpdateCategory(category: Category): void}
    > = 
    
    ({todos, categories, setDisplayedTodos, handleUpdateCategory, handleCreateCategory, filter}) => {

    const [options, setOptions] = useState<optionsForm>({completed: false, categories: [], fromDate: '', toDate: '', searchStr: ''})

    const categoryOptions = categories.map((category: any) => {return {value: category.name, label: category.name, color: category.color}})

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
          const stringCategories = options.categories.map(category => category.value)
          if (todo.category && stringCategories.includes(todo.category)) {
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

    const [showNew, setShowNew] = useState(false)
    const [newCategory, setNewCategory] = useState<Category>({name: '', color: ''})

    return(
      <div>
        <div>Filter by:</div>
        <div>
            <label>Hide completed</label>
            <input type="checkbox"
                   className="switch" 
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

        <div>
          <label>Search</label>
          <input value={options.searchStr}
                 onChange={e => setOptions({...options, searchStr: e.target.value})}/>
        </div>

        <div>
          Settings:
          {categories.map(category => {
            return (<CategoryEditor category={category} handleUpdateCategory={handleUpdateCategory} />)
          })}
          {showNew ? <div>
                        <button onClick={() => setShowNew(false)}>-</button> 
                        <CategoryEditor category={newCategory} handleUpdateCategory={setNewCategory}/>
                        <button onClick={() => {handleCreateCategory(newCategory.name, newCategory.color); setShowNew(false); setNewCategory({name: '', color: ''})}}>ADD</button>
                      </div>
                   : <button onClick={() => {setShowNew(true)}}>+</button>}
        </div>
      </div>
    ) 

} 


export default TodoControl
