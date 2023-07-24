const status_map = {
  0: "Wating",
  1: "OnRoute",
  2: "Completed",
  3: "Canceled",
  4: "None",
};
export function getOfferStatus(status: number) {
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
        <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-red-100 dark:bg-gray-800 ml-2">
          <h2 className="text-sm font-normal text-red-500">
            {status_map[3].charAt(0).toUpperCase() + status_map[3].slice(1)}
          </h2>
        </div>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status_map[4].replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
