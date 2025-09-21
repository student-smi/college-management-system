import React from 'react'

import Announcements from '@/components/Announcement'
import BigCelender from '@/components/BigCelender'


const parentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (Nisha)</h1>
        <div className=' w-full h-svh '>
           <BigCelender/>
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

export default parentPage;
