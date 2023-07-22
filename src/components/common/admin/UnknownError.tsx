import { BiErrorAlt } from 'react-icons/bi'
import { RxReload } from 'react-icons/rx'
interface UnknownErrorProps {
  refresh: () => void
}
const UnknownError = ({ refresh }: UnknownErrorProps) => {
  return (
    <div className="flex flex-col gap-5 mt-16 items-center p-3">
      <BiErrorAlt size={80} className='text-primary' />
      <div className="text-gray-500 text-lg text-center pb-16">
        Something went wrong try again
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

export default UnknownError