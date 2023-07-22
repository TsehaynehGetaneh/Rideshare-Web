import React from "react";

type Props = {
  role: string;
  textSize?: string;
};

const Role = ({role, textSize='text-xs'}: Props) => {
  switch(role){
    case 'Commuter':{
        return (
        <p className={`font-semibold px-5 py-1 ${textSize} text-cyan-500 rounded-full dark:bg-gray-800 bg-cyan-100/60`}>
            Commuter
        </p>
      );
    }
    case 'Driver':{
        return (
        <p className={`font-semibold px-5 py-1 ${textSize} text-fuchsia-500 rounded-full dark:bg-gray-800 bg-fuchsia-100/60`}>
            Driver
        </p>
      );
    }
    case 'Admin':{
        return (
        <p className={`font-semibold px-5 py-1 ${textSize} text-orange-500 rounded-full dark:bg-gray-800 bg-orange-100/60`}>
            Admin
        </p>
      );
    }
    default:
      return <div />;
  }
};

export default Role;
