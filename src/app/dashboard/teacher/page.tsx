// import Announcement from '@/components/Announcement'
// import BigCelender from '@/components/BigCelender'
// //import EventCalendar from '@/components/EventCalendar'
// import React from 'react'

// const teacherPage = () => {
//   return (
//     <div className=' flex-1 flex-col xl:flex-row gap-4 p-4'>
//       {/* left */}
//       <div className=' w-full xl:w-2/3'>
//       <div className=' h-full bg-white p-4 rounded-md'>
//          <h1 className=' text-2xl font-semibold '>Schedule </h1>
//          <BigCelender/>
//       </div>
//       </div>
//       {/* right */}
//       <div className=' w-full xl:w-1/3 flex flex-col '>
         
//        <Announcement/>
//       </div>
//     </div>
//   )
// }

import Announcements from '@/components/Announcement'
import BigCelender from '@/components/BigCelender'
import BigCelenderConte from '@/components/BigCelenderConte';
import { auth } from '@clerk/nextjs/server';


const TeacherPage =async () => {
   const { sessionClaims  , userId } =await auth();
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule </h1>
        <div className=' w-full h-svh '>
           <BigCelenderConte type="teacherId" id={userId!} />
          </div> 
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
       
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
