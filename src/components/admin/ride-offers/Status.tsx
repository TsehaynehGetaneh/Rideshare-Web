export function getOfferStatus(status: string) {
  switch (status) {
    case "onRoute":
      return (
        <span className="capitalize rounded-3xl py-1 px-2 text-xs text-white bg-blue-500">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "waiting":
      return (
        <span className="capitalize rounded-3xl py-1 px-2  text-xs  text-white bg-orange-500">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "cancelled":
      return (
        <span className="capitalize rounded-3xl py-1 px-2  text-xs  text-white bg-red-500">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Completed":
      return (
        <span className="capitalize rounded-3xl py-1 px-2  text-xs  text-white  bg-emerald-500">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
