import Announcement from '@/components/Announcement'
import AnnouncementSkeleton from '@/components/AnnouncementSkeleton'
//import Attendance from '@/components/Attendance'
import AttendanceContainer from '@/components/AttendanceContainer'
//import CountCart from '@/components/CountCart'
import Countcontainer from '@/components/Countcontainer'
//import EventCalendar from '@/components/EventCalendar'
import EventCalendarCon from '@/components/EventCalendarCon'
import EventCalendarSkeleton from '@/components/EventCalendarSkeleton'
import FinaceCharts from '@/components/FinaceCharts'
import UserCard from '@/components/UserCard'
import { auth } from '@clerk/nextjs/server'
import React, { Suspense } from 'react'

const adminPage =async ({searchParams }: {searchParams :{[key : string] : string | undefined}}) => {
    const { sessionClaims , userId } =await auth();
  
    const role = (sessionClaims?.metadata as { role?: string })?.role;
 
 function UserCardSkeleton() {
  return (
    <div className="rounded-2xl p-4 flex-1 bg-gray-200 animate-pulse min-w-[110px]">
      {/* top row: year + more icon */}
      <div className="flex justify-between items-center">
        <div className="w-12 h-5 bg-gray-300 rounded-full" />
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* count number */}
      <div className="my-4 w-16 h-8 bg-gray-300 rounded-md" />

      {/* type label */}
      <div className="w-20 h-4 bg-gray-300 rounded-md" />
    </div>
  );
}

// components/skeletons/CountContainerSkeleton.tsx


 function CountContainerSkeleton() {
  return (
    <div className="p-4 bg-gray-200 rounded-lg w-full h-full animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-24 h-5 bg-gray-300 rounded-md" />
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* Chart area (CountCart placeholder) */}
      <div className="w-full h-40 bg-gray-300 rounded-md mb-6" />

      {/* Bottom stats */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-300" />
          <div className="w-10 h-6 bg-gray-300 rounded-md" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-300" />
          <div className="w-10 h-6 bg-gray-300 rounded-md" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function AttendanceSkeleton() {
  return (
    <div className="bg-white rounded-lg w-full h-[400px] p-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center py-2 mt-2.5">
        <div className="w-28 h-6 bg-gray-200 rounded-md" />
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* Chart placeholder */}
      <div className="flex items-end justify-between h-[300px] mt-6 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-8 bg-gray-200 rounded-md"
            style={{
              height: `${80 + (i % 3) * 40}px`, // varied heights for bar effect
            }}
          />
        ))}
      </div>
    </div>
  );
}

 function FinanceChartSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-28 h-6 bg-gray-300 rounded-md" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>

      {/* Chart placeholder */}
      <div className="w-full h-[400px] flex flex-col justify-between">
        {/* Horizontal grid lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-full h-4 bg-gray-200 rounded-md" />
        ))}
      </div>
    </div>
  );
}

 

  return (
    <div className=' flex flex-col md:flex-row'>
      {/* left */}
       <div className=' w-full lg:w-2/3 flex flex-col gap-4'>

       <div className=' flex  gap-4 justify-between flex-wrap '>
        {/* <UserCard type="admin"/>
         <UserCard type="student"/>
         <UserCard type="teacher"/>
         <UserCard type="parents"/> */}
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="admin" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="student" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="teacher" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="parents" />
          </Suspense>
       </div>
      
      {/* Count card */}
       <div > 
         {/* midder cart */}
          <div className=' flex  gap-4 flex-col lg:flex-row'>
            {/* attendance cart */}
            <div className=' w-full lg:w-1/3 h-[400px]'>
            <Suspense fallback={<CountContainerSkeleton/>}> <Countcontainer/></Suspense>
            
             </div>
            {/* cart 2 */}
            <div className=' w-full lg:w-2/3  h-[400px] ' > 
             <Suspense fallback={<AttendanceSkeleton/>}>  <AttendanceContainer/></Suspense>
            
            </div>
          </div>
          {/* bottom cart */} 

          <div className=' w-full h-[500px]'>
             <Suspense fallback={<FinanceChartSkeleton/>}>  <FinaceCharts/></Suspense>
            
          </div>
       </div>
       </div>
       {/* right */}
       <div  className=' w-full lg:w-1/3 flex flex-col'>
        <Suspense fallback={<EventCalendarSkeleton/>}>  <EventCalendarCon searchParams={searchParams} /></Suspense>
       <Suspense fallback={<AnnouncementSkeleton/>}> <Announcement/></Suspense>
      
       </div>
    </div>
  )
}

export default adminPage