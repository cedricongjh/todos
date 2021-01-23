import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse }  from 'axios'
import TodoItem from './todoItem'
import { Todo, Category } from '../../interfaces/todo.interfaces'
import TodoControl from './todoControl'

const TodoList: React.FC<{setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = 
  ({setLoggedIn}) => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const handleSubmit = (payload: Todo) => {
    axios.post('/todos', {...payload}).then((resp: any) => {
      setTodos(() => {
        let newTodos = [...todos]
        newTodos.pop()
        return [...newTodos, resp.data.data, {text: '', category: '', due: '', completed: false}]
      })
    })
  }

  const handleUpdate = (todo: Todo, property: string, newValue: any) => {
      setTodos(() => {
        if (todo.id) {
          return todos.map(ele => ele.id !== todo.id ? ele: {...todo, [property]: newValue})
        } else {
          return todos.map(ele => ele.id ? ele : {...todo, [property]: newValue})
        }
      })
    }

  const handleDelete = (todo: Todo) => {
    axios.delete(`todos/${todo.id}`).then((resp: AxiosResponse<any>) => {
      setTodos(todos.filter(item => item.id !== todo.id))
    })
  }

  const handleCreateCategory = (newCategory: string, color?: string, todo?: Todo) => {
    axios.post('/categories', {name: newCategory, color: color}).then((resp: AxiosResponse<any>) => {
      setCategories([...categories, resp.data.data])
      if (todo) {
        handleUpdate(todo, 'category', resp.data.data.name)
      }
    })
  }

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(() => {
      if (updatedCategory.id) {
        return categories.map(ele => ele.id !== updatedCategory.id ? ele : {...updatedCategory})
      } else {
        return categories.map(ele => ele.id ? ele : {...updatedCategory})
      }
    })
  }

  const logout = () => {
      axios.post('logout').then((resp: AxiosResponse<any>) => {
        setLoggedIn(false)
      })

  }

  // trigger filtering when todos update
  useEffect(() => {
    setDisplayedTodos([...todos])
    setFilter(f => !f)
  }, [...todos.map(todo => {return {category_id: todo.category_id, due: todo.due, completed: todo.completed}})])

  // fetch user data upon mounting
  useEffect(() => {
    axios.get('/user').then((resp: any) => {
      let todos = resp.data.data['todos']
      todos.push({text: '', category: '', due: '', completed: false})
      setTodos(todos)
      let categories = resp.data.data['categories']
      setCategories(categories)
    }).catch(err => {
      console.log(err)
      setTodos([{text: '', category_id: undefined, due: '', completed: false}])
    })
  }, [])

  return (
  <div className="todo-list">

    <div>
       <TodoControl 
        todos={todos} 
        categories={categories}
        filter={filter} 
        setDisplayedTodos={setDisplayedTodos}
        handleCreateCategory={handleCreateCategory}
        handleUpdateCategory={handleUpdateCategory}
        handleLogout={logout} />
    </div>

    <div className="todo-list-headers">
      <div></div>
      <div className="todo-list-todo-header">TODO</div>
      <div>CATEGORY</div>
      <div>DUE</div>
    </div>
  
    {displayedTodos.map(todo => 
    <TodoItem
      key={todo.id || ''} 
      todo={todo}
      categories={categories}
      handleUpdate={handleUpdate}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      createCategory={handleCreateCategory} 
    />)}
  
  </div>
  )
}

export default TodoList;