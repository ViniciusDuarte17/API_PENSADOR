
export type Quotes = {
    id: string
    phrase : string
    date: Date
    userId: string
}

export type updateQuotes = {
    id: string
    phrase : string
}
export type readQuotes = {
    id: string
    name: string
    phrase : string
    date: Date
}
