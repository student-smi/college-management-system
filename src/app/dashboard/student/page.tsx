import Announcement from '@/components/Announcement'
import AnnouncementSkeleton from '@/components/AnnouncementSkeleton'
import BigCelender from '@/components/BigCelender'
import BigCelenderConte from '@/components/BigCelenderConte'
import BigCelenderSkeleton from '@/components/BigCelenderConteSkeleton'
import EventCalendar from '@/components/EventCalendar'
import EventCalendarSkeleton from '@/components/EventCalendarSkeleton'
import React, { Suspense } from 'react'

const studentPage = () => {
  return (
    <div className=' flex flex-col xl:flex-row gap-2'>
      {/* left */}
      <div className=' w-full xl:w-2/3'>
      <div className=' h-full bg-white p-4 rounded-md'>
         <h1 className=' text-2xl font-semibold '>Schedule (4A)</h1>
           <Suspense fallback={<BigCelenderSkeleton/>}> <BigCelenderConte  /></Suspense>
        
      </div>
      </div>
      {/* right */}
      <div className=' w-full xl:w-1/3 flex flex-col '>
        <Suspense fallback={<EventCalendarSkeleton/>}>  <EventCalendar/>  </Suspense>

        
                 <Suspense fallback={<AnnouncementSkeleton/>}> <Announcement/></Suspense>
          
     
      </div>
    </div>
  )
}

export default studentPage