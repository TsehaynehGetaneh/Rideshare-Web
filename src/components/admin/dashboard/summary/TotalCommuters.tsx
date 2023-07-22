import { useGetTotalCommutersQuery } from '@/store/api'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import Card from '../Card'
import { PercentageChange } from '@/types/stat'

type Props = {}

const TotalCommuters = (props: Props) => {
    const { data, isLoading } = useGetTotalCommutersQuery()
  return (
    <div>
        {isLoading ? 
        <div className='w-52 h-44 rounded-lg shadow-lg bg-gray-200 animate-pulse' />
        :<Card Icon={AiOutlineUser} Item={data as PercentageChange}/>}
    </div>
  )
}

export default TotalCommuters