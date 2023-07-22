import React from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { PercentageChange } from "@/types/stat";

type CardProps = {
  Icon: IconType,
  Item: PercentageChange
};
const names = new Map([
  ['riderequests', 'Requests'],
  ['rideoffers', 'Offers'],
  ['drivers', 'Drivers'],
  ['vehicles', 'Vehicles'],
  ['Count', 'Commuters']


])


const Card = ({
  Icon,
  Item
}: CardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-52 space-y-2 border ">
      <div className="text-primary  p-3 bg-primary bg-opacity-20 rounded-full w-fit">
        {Icon && <Icon size={20} />}
      </div>
      <div className="text-2xl font-bold">{Item?.currentCount.toLocaleString()}</div>
      <div className="flex justify-between gap-5">
        <div className="text-xs">Total {names.get(Item?.name)}</div>
        <div
          className={`flex items-center text-green-500 text-red-500"`}
        >
            <MdArrowDropUp size={20} />
          <div className="text-sm">{Item?.percentageChange.toFixed()}%</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
