// converts a string of format (YYYY-MM-DD) to a date object
export const dateConverter = (date: string) => {
    return new Date(date.replace(/-/g, "/"))
}

// function for inserting todo into array
export const insertTodo = (todos: any[], todo: any, ascending: boolean) => {

    let insertedIdx = 0
    let res = [...todos]

    if (todo.due) {
        while (!todos[insertedIdx].due) {
            insertedIdx++
        }
        if (ascending) {
            while (todos[insertedIdx].due &&  dateConverter(todo.due) >= dateConverter(todos[insertedIdx].due)) {
                insertedIdx++
            }
        } else {
            while (todos[insertedIdx].due &&  dateConverter(todo.due) <= dateConverter(todos[insertedIdx].due)) {
                insertedIdx++
            }
        }
    }

    res.splice(insertedIdx, 0, todo)

    return res      

}
