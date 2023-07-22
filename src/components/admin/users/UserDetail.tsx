import { useGetUserByIDQuery } from "@/store/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";

const statusColors = new Map([
  ['ACTIVE', {
    icon: "text-green-500",
    color: "text-green-500 bg-green-500",
  }],
 [ "INACTIVE", {
    icon: "text-red-500",
    color: "text-red-500 bg-red-500",
  }],
]);
const roleColors = new Map([
 [ 'Commuter', "bg-purple-500"],
  ['Driver',"bg-rose-500"],
  
  ['Admin', "bg-blue-500"],
])

type UserDetailProps = {
  id: string;
};

const UserDetail = ({ id }: UserDetailProps) => {
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const { data, isLoading,  } = useGetUserByIDQuery(id)
  useEffect(()=>{
    if(data){
      setRole(data.roles[0].name)
      setStatus(data.statusByLogin)
    }
  },[data])
  return (
    <div className="flex flex-wrap gap-10 justify-evenly items-center p-5 rounded-3xl">
      <Head>
        <title>{data?.fullName}</title>
      </Head>
      <div className="flex flex-col items-center gap-5">
        {data && data.profilePicture ?
        <img className="w-72 h-72" src="/images/admin/profile.svg" alt="" />:
        <FaUserCircle className="text-gray-400" size={250} />
          }
        <div className="flex gap-4 items-center">
          <div
            className={`text-2xl text-white font-semibold ${roleColors.get(role)}  rounded-full px-5 py-1`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        </div>
      </div>
      <div className="w-96 bg-gray-100 space-y-3 rounded-2xl p-8">
        <div className="text-2xl font-semibold">Account Detail</div>
        {data && <div className="flex gap-4 items-center">
          <FaUserAlt size={20} className="text-primary" />
          <div className="font-semibold text-lg">{data.fullName}</div>
        </div>}
        {data && role === 'Admin' &&
          <div className="flex gap-4 items-center">
          <FaEnvelope size={20} className="text-primary" />
          <div className="font-semibold text-lg">{data.email}</div>
        </div>}
        {data && 
        <div className="flex gap-4 items-center">
          <FaPhoneAlt size={20} className="text-primary" />
          <div className="font-semibold text-lg">{data.phoneNumber}</div>
        </div>}
          {data && 
          <div className="flex gap-4 items-center">
            <RiRadioButtonLine
              size={20}
              className={`${statusColors.get(status)?.icon}`}
            />
            <div
              className={`${statusColors.get(status)?.color} font-bold bg-opacity-20 rounded-full px-5 py-1`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </div>
          </div>}
      </div>
    </div>
  );
};

export default UserDetail;
