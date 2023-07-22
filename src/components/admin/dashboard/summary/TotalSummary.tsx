import { useGetTotalSummaryQuery } from '@/store/api'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import Card from '../Card'
import { MdOutlineLocalOffer, MdOutlineRequestPage } from 'react-icons/md'
import { FaCar } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

type Props = {}

const icons = new Map([
    ['riderequests', MdOutlineRequestPage],
    ['rideoffers', MdOutlineLocalOffer],
    ['drivers', AiOutlineUser],
    ['vehicles', FaCar]

])

const TotalCommuters = (props: Props) => {
    const { data, isLoading } = useGetTotalSummaryQuery()
  return (
    <>
        {
          isLoading ? 
          Array.from({length:4}).map((_, index) => <div key={index} className='w-52 h-44 rounded-lg shadow-lg bg-gray-200 animate-pulse' />)
          :
        data?.map((change, index) => <Card key={index} Icon={icons.get(change.name) as IconType} Item={change}/>)
        }
    </>
  )
}

export default TotalCommuters