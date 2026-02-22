export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-200 h-6 w-24 rounded"></div>
            <div className="bg-gray-200 h-6 w-16 rounded"></div>
          </div>
          <div className="bg-gray-200 h-7 w-3/4 rounded mb-2"></div>
          <div className="bg-gray-200 h-5 w-1/2 rounded"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-gray-200 h-4 w-32 rounded"></div>
        <div className="bg-gray-200 h-4 w-24 rounded"></div>
        <div className="bg-gray-200 h-4 w-28 rounded"></div>
      </div>

      <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
      <div className="bg-gray-200 h-4 w-5/6 rounded mb-4"></div>

      <div className="flex items-center justify-between">
        <div className="bg-gray-200 h-5 w-24 rounded"></div>
        <div className="bg-gray-200 h-10 w-32 rounded"></div>
      </div>
    </div>
  );
}
