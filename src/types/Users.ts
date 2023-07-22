export interface User {
    roles:{id:string, name:string}[],
    id:string,
    fullName:string,
    phoneNumber:string,
    email?:string,
    profilePicture?:string,
    statusByLogin:string
}

export interface UsersFilter {
    page:number,
    size:number,
    query?:string,
    phoneNumber?:string,
    role?:string | null,
    status?:string | null,
}