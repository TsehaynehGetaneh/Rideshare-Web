import { User } from "./Users";
import { Driver } from "./driver";

export interface OffersFilter {
  page: number;
  size: number;
  query?: string;
  phone?: string;
  MinCost?: number;
  MaxCost?: number;
  status?: string;
}

export interface Offer {
  id: number;
  driver: Driver;
  originAddress: string;
  destinationAddress: string;
  status: number;
  availableSeats: number;
  estimatedFare: number;
  estimatedDuration: string;
}
