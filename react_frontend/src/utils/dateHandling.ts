// converts a string of format (YYYY-MM-DD) to a date object
export const dateConverter = (date: string) => {
    return new Date(date.replace(/-/g, "/"))
}

// function for inserting todo into array
export const insertTodo = (todos: any[], todo: any, ascending: boolean) => {

    let insertedIdx = 0
    let res = [...todos]

    if (todo && todo.due) {
        while (res[insertedIdx] && !res[insertedIdx].due) {
            insertedIdx++
        }
        if (ascending) {
            while (res[insertedIdx] && res[insertedIdx].due &&  dateConverter(todo.due) >= dateConverter(res[insertedIdx].due)) {
                insertedIdx++
            }
        } else {
            while (res[insertedIdx] && res[insertedIdx].due &&  dateConverter(todo.due) <= dateConverter(res[insertedIdx].due)) {
                insertedIdx++
            }
        }
    }

    res.splice(insertedIdx, 0, todo)

    return res      

}
