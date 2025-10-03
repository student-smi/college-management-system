
import React, { Suspense } from 'react'
import Attendance from './Attendance'
import Image from 'next/image'
import { prisma } from '@/lib/prisma';

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

const AttendanceContainer = async () => {
   const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  // console.log(data)

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();
    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
      <div className=' bg-white rounded-lg'>
            <div className=' flex justify-between items-center py-2 mt-2.5'>
                <h1 className=' text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
           
           <Attendance data={data}/>
        </div>
  )
}

export default AttendanceContainer