import React from 'react'
import { MdOutlineQueryStats } from 'react-icons/md'
import { RxReload } from 'react-icons/rx'

type NoDoughnutChartStatisticsProps = {
  refresh: () => void
}

const NoDoughnutChartStatistics = ({refresh}: NoDoughnutChartStatisticsProps) => {
  return (
    <div className="flex flex-col justify-center gap-5 mt-16 items-center p-3">
        <MdOutlineQueryStats size={100} className="text-gray-400" />
        <div className="text-gray-500 text-lg text-center pb-16">
            There are No Statistics to Show
        </div>
        <button
        onClick={refresh}
        className="flex gap-5 items-center justify-center rounded-full w-44 py-2 bg-primary"
      >
        <RxReload className="text-white" />
        <div className="text-white">Try Again</div>
      </button>
        
    </div>
  )
}

export default NoDoughnutChartStatistics