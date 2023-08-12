export const status_map : {[key: number]: string } = {
  0: "Waiting",
  1: "OnRoute",
  2: "Completed",
  3: "Canceled",
};

export const reverse_map : {[key: string]: number } = {
  "Waiting": 0,
  "OnRoute": 1,
  "Completed" : 2,
  "Canceled" : 3,
};
export function getRequestStatus(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-indigo-200 dark:bg-gray-800 ml-2.5">
          <h2 className="text-sm font-normal text-indigo-500">
            {status_map[1].charAt(0).toUpperCase() + status_map[1].slice(1)}
          </h2>
        </div>
      );
    case 0:
      return (
        <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-orange-100 dark:bg-gray-800 ml-2.5">
          <h2 className="text-sm font-normal text-orange-500">
            {status_map[0].charAt(0).toUpperCase() + status_map[0].slice(1)}
          </h2>
        </div>
      );
    case 2:
      return (
        <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          <h2 className="text-sm font-normal text-emerald-500">
            {status_map[2].charAt(0).toUpperCase() + status_map[2].slice(1)}
          </h2>
        </div>
      );
    case 3:
      return (
        <div className="inline-flex items-center px-3 py-2 ml-2 bg-red-100 rounded-full gap-x-2 dark:bg-gray-800">
          <h2 className="text-sm font-normal text-red-500">
            {status_map[3].charAt(0).toUpperCase() + status_map[3].slice(1)}
          </h2>
        </div>
      );
    default:
      return (
        <span className="px-2 py-1 text-xs text-gray-600 capitalize bg-gray-100 rounded-md">
          All
        </span>
      );
  }
}
