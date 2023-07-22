export type Interval = 'monthly' | 'yearly' | 'weekly'
export interface TimeFrame {
    year?:number,
    month?:number,
    option:Interval
}

export interface VerticalBarChartData {
    xAxisData:string[],
    yAxisData:number[]
}

export interface TopVehicles {
    model:string,
    count:number
}

export interface TopDrivers {
    driverID:string,
    totalOffers:number,
    earnings:number
}

export interface PercentageChange {
    name:string,
    currentCount:string,
    percentageChange:number
}