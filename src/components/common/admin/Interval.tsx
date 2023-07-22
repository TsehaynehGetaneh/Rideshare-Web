import { Interval } from "@/types/stat";
import React from "react";

type IntervalFilterProps = {
  interval: string;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
};
const months = [
  { name: "Jan", value: "1" },
  { name: "Feb", value: "2" },
  { name: "Mar", value: "3" },
  { name: "Apr", value: "4" },
  { name: "May", value: "5" },
  { name: "Jun", value: "6" },
  { name: "Jul", value: "7" },
  { name: "Aug", value: "8" },
  { name: "Sept", value: "9" },
  { name: "Oct", value: "10" },
  { name: "Nov", value: "11" },
  { name: "Dec", value: "12" },
];
const IntervalFilter = ({
  interval,
  setInterval,
  setMonth,
  setYear,
}: IntervalFilterProps) => {
  return (
    <div className="flex  justify-between">
      <div className="flex gap-5">
        {(interval === "monthly" || interval === "weekly") && (
          <div className="flex gap-2 items-center">
            <label htmlFor="year">Year</label>
            <select
              className="outline-none shadow-md border rounded-lg py-2 px-2"
              id="year"
              onChange={(e) => setYear(parseInt(e.target.value))}
            > 
              <option value="2022">2022</option>
              <option selected value="2023">2023</option>
            </select>
          </div>
        )}
        {interval === "weekly" && (
          <div className="flex gap-2 items-center">
            <label htmlFor="month">Month</label>
            <select
              className="outline-none shadow-md border rounded-lg py-2 px-2"
              id="month"
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <select
        value={interval}
        className="outline-none shadow-md border rounded-lg py-2 px-4"
        onChange={(e) => setInterval(e.target.value)}
      >
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
      </select>
    </div>
  );
};

export default IntervalFilter;
