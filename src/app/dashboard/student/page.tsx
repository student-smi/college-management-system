import Announcement from '@/components/Announcement'
import BigCelender from '@/components/BigCelender'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const studentPage = () => {
  return (
    <div className=' flex flex-col xl:flex-row gap-2'>
      {/* left */}
      <div className=' w-full xl:w-2/3'>
      <div className=' h-full bg-white p-4 rounded-md'>
         <h1 className=' text-2xl font-semibold '>Schedule (4A)</h1>
         <BigCelender/>
      </div>
      </div>
      {/* right */}
      <div className=' w-full xl:w-1/3 flex flex-col '>
          <EventCalendar/>
       <Announcement/>
      </div>
    </div>
  )
}

export default studentPage