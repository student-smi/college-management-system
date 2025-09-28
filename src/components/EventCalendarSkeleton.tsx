export default function EventCalendarSkeleton() {
  return (
    <div className="rounded-md bg-white p-4 animate-pulse">
      {/* Calendar placeholder */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-gray-200 rounded-md"
          />
        ))}
      </div>

      {/* Event section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="w-24 h-6 bg-gray-200 rounded-md" />
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
        </div>

        {/* Event list placeholders */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full h-10 bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
 