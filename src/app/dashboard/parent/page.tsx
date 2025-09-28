import React, { Suspense } from 'react'

import Announcements from '@/components/Announcement'
import BigCelender from '@/components/BigCelender'
import BigCelenderSkeleton from '@/components/BigCelenderConteSkeleton';
import AnnouncementSkeleton from '@/components/AnnouncementSkeleton';


const parentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (Nisha)</h1>
        <div className=' w-full h-svh '>
             <Suspense fallback={<BigCelenderSkeleton/>}>   <BigCelender/></Suspense>
                  
         
          </div> 
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
       
          <Suspense fallback={<AnnouncementSkeleton/>}>  <Announcements /></Suspense>
       
      </div>
    </div>
  );
};

export default parentPage;
