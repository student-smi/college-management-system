
import Image from 'next/image'
import React from 'react'
import EventCalendar from './EventCalendar'
import Event from './Event'

const EventCalendarCon = ({searchParams }: {searchParams :{[key : string] : string | undefined}}) => {
 
    const {date} = searchParams

  return (
   <div className=' rounded-md bg-white p-4 '>
      
         <EventCalendar/>
        
        <div className=' flex flex-col gap-3 '>
            <div className=' flex justify-between items-center'>
                 <h1 className=' text-lg font-semibold'>Event</h1>
              <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
          <Event dateParams={date}/>
        </div>
    </div>
  )
}

export default EventCalendarCon