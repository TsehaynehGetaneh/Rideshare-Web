import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'


// interface RideRequestProps {
    
// }
const RideRequestItem: React.FC= () => {
  return (
    
      <tr>
                <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                       <h2 className="font-medium text-gray-800 dark:text-white">Tony Stark</h2>
    
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">4 kilo</td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">bole</td>
                <td className="px-7 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">100</td>
                <td className="px-10 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">5</td>
                <td className="px-0 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    Completed 
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
             
            {/* </tr>
        <p>{name}</p>
        <p>{origin}</p>
        <p>{destination}</p>
        <p>{currentFare}</p>
        <p>{numberOfSeats}</p>
        <p>{status}</p>
        <p>{dateTime.getDate()}</p> */}
    
  

export default RideRequestItem