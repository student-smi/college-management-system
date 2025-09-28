export default function AnnouncementSkeleton() {
  return (
    <div className="rounded-md bg-white p-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-32 h-6 bg-gray-200 rounded-md" />
        <div className="w-16 h-4 bg-gray-200 rounded-md" />
      </div>

      {/* Skeleton cards for announcements */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="m-2 p-4 rounded-md bg-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="w-24 h-4 bg-gray-300 rounded-md" />
              <div className="w-16 h-3 bg-gray-300 rounded-md" />
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-md mt-2" />
            <div className="w-5/6 h-3 bg-gray-300 rounded-md mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}