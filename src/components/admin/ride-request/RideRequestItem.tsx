import { User } from '@/types/Users';
import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { getRequestStatus } from './Status';


interface RideRequestProps {
  id: number 
  name:string
  origin: string,
  destination: string,
  currentFare: number,
  status: number,
  numberOfSeats: number
}


const RideRequestItem: React.FC<RideRequestProps>= ({id, name, origin, destination, currentFare, status, numberOfSeats}) => {
  const st = getRequestStatus(status)
  return (
    
      <tr>
                <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                       <h2 className="font-medium text-gray-800 dark:text-white">{name}</h2>
    
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{origin}</td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{destination}</td>
                <td className="py-4 text-sm text-gray-500 px-7 dark:text-gray-300 whitespace-nowrap">{currentFare}</td>
                <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{numberOfSeats}</td>
                <td className="px-0 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {st} 
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jun 26, 2023</td>
                
                <td className="px-4 py-4 text-xl text-center whitespace-nowrap">
                    
                <button className=" focus:outline-none">
                            <BsFillTrash3Fill size={20} className='transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 text-primary' />
                          </button>
     
                   
                </td>
                </tr>
          )
        }
             
  

export default RideRequestItem