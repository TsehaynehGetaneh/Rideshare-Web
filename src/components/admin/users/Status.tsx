import React from "react";

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  switch (status) {
    case "active": {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

          <h2 className="text-sm font-normal text-emerald-500">Active</h2>
        </div>
      );
    }
    case "idle": {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>

          <h2 className="text-sm font-normal text-red-500">Idle</h2>
        </div>
      );
    }
    default:
      return <div />;
  }
};

export default Status;
