import React from 'react'
import CountCart from './CountCart';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';




const Countcontainer =async () => {
    const data =await prisma.student.groupBy({
        by :["sex"],
        _count : true
    })

   // console.log(data);
    const boys = data.find(d=> d.sex === "MALE")?._count || 0
    const girls = data.find(d=> d.sex === "FEMALE")?._count || 0

    
  return (
   <div className=' p-4  bg-white rounded-lg  w-full h-full'>
           <div className=' flex justify-between '>
               {/* title */}
               <h1 className=' text-lg font-semibold'>Student</h1>
                 <Image src="/moreDark.png" alt='' width={20} height={20}/>
           </div>
           <CountCart boys={boys} girls={girls}/>
           <div className=' flex  justify-center gap-16'>
               {/* bottom */}
                <div className=' flex flex-col '>
                   <div className=' w-5 h-5 rounded-full bg-lamaYellow'></div>
                   <h1 className=' font-bold'>{girls}</h1>
                   <div className=' text-sm font-semibold text-gray-500' >girls(20)</div>
                </div>
                <div className=' flex flex-col '>
                   <div className=' w-5 h-5 rounded-full  bg-lamaSky'></div>
                   <h1 className=' font-bold'>{boys}</h1>
                   <div className=' text-sm font-semibold text-gray-500' >boys(20)</div>
                </div>
           </div>
       </div>
  )
}

export default Countcontainer