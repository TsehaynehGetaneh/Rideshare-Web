export function getRequestStatus(status: string) {
    switch (status) {
      case "onroute":
        return (
          <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-indigo-200 dark:bg-gray-800 ml-2.5">
  
  
                          <h2 className="text-sm font-normal text-indigo-500">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                      </div>
  
        );
      case "waiting":
        return (
          <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-orange-100 dark:bg-gray-800 ml-2.5">
  
                          <h2 className="text-sm font-normal text-orange-500">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                      </div>
        );
      case "completed":
        return (
          <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
  
                          <h2 className="text-sm font-normal text-emerald-500">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                      </div>
        );
        case "canceled":
        return (
          <div className="inline-flex items-center px-3 py-2 rounded-full gap-x-2 bg-red-100 dark:bg-gray-800 ml-2">    
                          <h2 className="text-sm font-normal text-red-500">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                      </div>
        );
      default:
        return (
          <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
            {status.replaceAll("_", " ").toLowerCase()}
          </span>
        );
    }
  }