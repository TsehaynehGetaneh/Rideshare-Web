import { useState } from 'react';
import { TbDetailsOff, TbLicense } from 'react-icons/tb';
import Image from 'next/image';
import { useGetDriverByIDQuery } from '@/store/api';
import { ClipLoader } from 'react-spinners';
import UnknownError from '@/components/common/admin/UnknownError';
import { MdOutlineStarRate } from 'react-icons/md';
import { CgWorkAlt } from 'react-icons/cg'
import { HiLocationMarker } from 'react-icons/hi'
import { BsCardText } from 'react-icons/bs';
import { RxReload } from 'react-icons/rx';

interface DriverDetailProps {
  driverID: string;
}

const DriverDetail: React.FC<DriverDetailProps> = ({ driverID }) => {
  const { data:driver, isLoading, isError, refetch} = useGetDriverByIDQuery(driverID);

  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsZoomed(false);
    }
  };
  return (
    <div
      className={`bg-white max-w-3xl px-5 py-10 shadow-md rounded-3xl ${
        isZoomed ? 'overflow-hidden' : ''
      }`}
    >
      <h1 className="text-3xl font-semibold pl-5 mb-4">Driver Details</h1>
      { isLoading ? 
        <div className="flex w-full h-72">
          <ClipLoader color="indigo" className="mx-auto mt-24" size={40} />
        </div>:
        isError ?
          <UnknownError refresh={refetch}/>:
        driver ?
        <div className="overflow-x-auto px-10 scrollbar-none">
        <style>
          {`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }

            .zoom-background {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.75);
              z-index: 50;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .zoom-background img {
              max-width: 90vw;
              max-height: 90vh;
              object-fit: contain;
              cursor: zoom-out;
            }
          `}
        </style>
        <div className="grid grid-cols-3 items-center gap-8 min-w-[500px]">
          <div className='flex items-center gap-5'>
            <TbLicense  className='text-primary' size={30}/>
            <span className='font-semibold text-xl'>License</span>

          </div>
          <div className="relative col-span-2">
            <Image
              src={driver.license}
              alt="Driver License"
              width={150}
              height={100}
              className="w-full h-auto cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={toggleZoom}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            />
            {isZoomed && (
              <div className="zoom-background" onClick={toggleZoom}>
                <Image
                  src={driver.license}
                  alt="Driver License"
                  width={500}
                  height={333}
                />
              </div>
            )}
          </div>
          <div className='flex items-center gap-5'>
            <BsCardText  className='text-primary' size={30}/>
            <span className='font-semibold text-xl'>License No.</span>
          </div>
          <span className='col-span-2'>{driver.licenseNumber}</span>
          <div className='flex items-center gap-5'>
            <CgWorkAlt  className='text-primary' size={30}/>
            <span className='font-semibold text-xl'>Experience</span>
          </div>
          <span className='col-span-2'>{driver.experience}</span>
          <div className='flex items-center gap-5'>
            <HiLocationMarker  className='text-primary' size={30}/>
            <span className='font-semibold text-xl'>Address</span>
          </div>
          <span className='col-span-2'>{driver.address}</span>
          <div className='flex items-center gap-5'>
            <MdOutlineStarRate  className='text-primary' size={30}/>
            <span className='font-semibold text-xl'>Rate Number</span>
          </div>
          <span className='col-span-2'>{driver.rate[2]}</span>
          
        </div>
      </div>:
      <div className="flex flex-col gap-5 mt-16 items-center p-3">
      <TbDetailsOff size={100} className="text-gray-400" />
      <div className="text-gray-500 text-lg text-center pb-16">
        There are No Driver Details
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
    </div>
  );
};

export default DriverDetail;