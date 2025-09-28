"use client"
import React, { Suspense } from 'react'
import Attendance from './Attendance'
import Image from 'next/image'

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

const AttendanceContainer = () => {
  return (
      <div className=' bg-white rounded-lg'>
            <div className=' flex justify-between items-center py-2 mt-2.5'>
                <h1 className=' text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
            <Suspense fallback={<AttendanceSkeleton/>}> <Attendance/></Suspense>
           
        </div>
  )
}

export default AttendanceContainer