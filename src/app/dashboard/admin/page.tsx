import Announcement from '@/components/Announcement'
//import Attendance from '@/components/Attendance'
import AttendanceContainer from '@/components/AttendanceContainer'
//import CountCart from '@/components/CountCart'
import Countcontainer from '@/components/Countcontainer'
//import EventCalendar from '@/components/EventCalendar'
import EventCalendarCon from '@/components/EventCalendarCon'
import FinaceCharts from '@/components/FinaceCharts'
import UserCard from '@/components/UserCard'
import React from 'react'

const adminPage =async ({searchParams }: {searchParams :{[key : string] : string | undefined}}) => {
  return (
    <div className=' flex flex-col md:flex-row'>
      {/* left */}
       <div className=' w-full lg:w-2/3 flex flex-col gap-4'>

       <div className=' flex  gap-4 justify-between flex-wrap '>
        <UserCard type="admin"/>
         <UserCard type="student"/>
         <UserCard type="teacher"/>
         <UserCard type="parents"/>
         
       </div>
      
      {/* Count card */}
       <div > 
         {/* midder cart */}
          <div className=' flex  gap-4 flex-col lg:flex-row'>
            {/* attendance cart */}
            <div className=' w-full lg:w-1/3 h-[400px]'>
             <Countcontainer/>
             </div>
            {/* cart 2 */}
            <div className=' w-full lg:w-2/3  h-[400px] ' > 
              <AttendanceContainer/>
            </div>
          </div>
          {/* bottom cart */} 

          <div className=' w-full h-[500px]'>
              <FinaceCharts/>
          </div>
       </div>
       </div>
       {/* right */}
       <div  className=' w-full lg:w-1/3 flex flex-col'>
       <EventCalendarCon searchParams={searchParams} />
       <Announcement/>
       </div>
    </div>
  )
}

export default adminPage