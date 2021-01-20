// converts a string of format (YYYY-MM-DD) to a date object
export const dateConverter = (date: string) => {
    return new Date(date.replace(/-/g, "/"))
}