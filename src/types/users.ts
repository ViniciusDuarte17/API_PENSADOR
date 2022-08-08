export type UsersDTO = {
    name : string,
    email: string,
    password: string
}
export type LoginDTO = {
    
    email: string,
    password: string
}
export type UserDateDTO = {
    id: string,
    name : string,
    email: string,
    password: string
}
export type UserUpdateDateDTO = {
    name ?: string,
    email ?: string
}