import { dateConverter } from "./dateHandling"

// takes an array of todos and options object and returns a filtered todo array based on the options
export const filterTodos = (todos: any, options: any) => {
    let newTodos = todos.filter((todo: { id: any; completed: any }) => {
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

      newTodos = newTodos.filter((todo: { id: any; category_id: any }) => {
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

      newTodos = newTodos.filter((todo: { id: any; due: any }) => {
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

      newTodos = newTodos.filter((todo: { id: any; text: string }) => {
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

      newTodos = newTodos.filter((todo: { id: any; due: any }) => {
        if (!todo.id) {
          return true
        }

        if (options.hideNoDate) {
          if (!todo.due || todo.due === '') {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      })


      return newTodos
}