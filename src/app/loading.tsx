export default function Loading(){
    return (
    <div className="flex flex-col items-center justify-center  h-screen min-h-[400px] gap-6">
      {/* University Icon / Circle */}
      <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Animated Text */}
      <div className="text-lg font-semibold text-gray-700 flex space-x-2">

        <span className="animate-pulse">Loading College Management System</span>
      
      </div>

      {/* Books / Items Animation */}
      <div className="flex gap-3 mt-4">
        <div className="w-6 h-6  bg-lamaYellow rounded animate-bounce"></div>
        <div className="w-6 h-6  bg-lamaPurple rounded animate-bounce delay-200"></div>
        <div className="w-6 h-6 bg-lamaSky rounded animate-bounce delay-400"></div>
      </div>
    </div>
  );
}