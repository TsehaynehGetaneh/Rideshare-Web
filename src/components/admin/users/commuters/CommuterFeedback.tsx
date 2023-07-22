import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useGetCommutersFeedbackQuery } from "@/store/api";
import UnknownError from "@/components/common/admin/UnknownError";
import { FeedBack } from "@/types/commuter";
import { ClipLoader } from "react-spinners";
import { MdFeedback } from "react-icons/md";
import { RxReload } from "react-icons/rx";

interface FeedbackProps {
  feedback:FeedBack
}

const CommuterFeedback: React.FC<FeedbackProps> = ({ feedback }) => {
  return (
    <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-8 ml-16">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {feedback.createdAt}
        </span>
      </div>

      <div className="mt-2">
        <a
          href="#"
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
        >
          {feedback.title}
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{feedback.content}</p>
      </div>
      <div className="flex mt-5  mb-5items-center">
        <FaStar className="w-5 h-5 text-yellow-500" />
        <FaStar className="w-5 h-5 text-yellow-500" />
        <FaStar className="w-5 h-5 text-yellow-500" />
        <FaStar className="w-5 h-5 text-yellow-500" />
        <FaRegStar className="w-5 h-5 text-yellow-500" />
      </div>
    </div>
  );
};


type CommuterFeedbacksProps = {}

const CommuterFeedbacks = (props: CommuterFeedbacksProps) => {
  const [size, setSize] = useState(5)
  const { data, isLoading, isFetching, isError, refetch} = useGetCommutersFeedbackQuery({page:1, size:size})
  const handleViewMore = () => {
    if(navigator.onLine){
      setSize(size + 5)
    }
  }
  return (
    <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold mx-16 mb-4">Feedbacks</h1>
        {isLoading || isFetching ? 
        <div className="flex w-full h-96">
          <ClipLoader color="indigo" className="mx-auto mt-24" size={40} />
        </div>:
        isError ? 
        <UnknownError refresh={refetch} />: 
        data && data.feedbacks && data.feedbacks.length > 0 ?
        <div>
          {data.feedbacks.map((feedback, index) => (
              <CommuterFeedback key={index} feedback={feedback} />
          ))}
        </div>:
        <div className="flex flex-col gap-5 mt-16 items-center p-3">
          <MdFeedback size={100} className="text-gray-400" />
          <div className="text-gray-500 text-lg text-center pb-16">
            There are No Feedbacks from this User
          </div>
          <button
            onClick={refetch}
            className="flex gap-5 items-center justify-center rounded-full w-44 py-2 bg-primary"
          >
            <RxReload className="text-white" />
            <div className="text-white">Try Again</div>
          </button>
      </div>
        }
       {!isError && data && data.feedbacks &&
        <div className="flex items-center justify-center mt-8 mx-auto">
          <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-80" onClick={handleViewMore}>
            View More
          </button>
        </div>}
      </div>
  )
}

export default CommuterFeedbacks
