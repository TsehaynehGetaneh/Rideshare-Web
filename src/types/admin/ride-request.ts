import { User } from "../Users"

export type RideRequest = {
    RideRequestID: number 
    name:string
    Commuter: User,
    Origin: string,
    Destination: string,
    CurrentFare: number,
    Status: number,
    NumberOfSeats: number
}

export interface RideRequestFilter {
    page:number,
    size:number,
    name?:string,
    fare?:number,
    status?:string | null,
}