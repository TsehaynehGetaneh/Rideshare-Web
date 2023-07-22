

export type RideRequest = {
    RideRequestID: number 
    name:string
    Commuter: string 
    Origin: string
    Destination: string
    CurrentFare: number
    Status: string
    NumberOfSeats: number
    CreatedDateTime: string
}




export enum Status {onroute, waiting, completed, canceled}