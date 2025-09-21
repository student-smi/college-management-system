
import Image from 'next/image';
import React from 'react'

 import { auth } from "@clerk/nextjs/server";
import { prisma } from '@/lib/prisma';
import { keyof } from 'zod';


let  event = [
    { 
        id : 1,
        title : " Lorem ipsum dolor ",
        time : "12 : 00 pm - 1 : 00 pm",
        description : " Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        id : 2,
        title : " Lorem ipsum dolor ",
        time : "12 : 00 pm - 1 : 00 pm",
        description : " Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        id : 3,
        title : " Lorem ipsum dolor ",
        time : "12 : 00 pm - 1 : 00 pm",
        description : " Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    
]
const Announcement =async () => {
    const { sessionClaims , userId } =await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;


// const rolecondition ={
//   teacher : { lessons :{some : { teacherId : userId}}},
//   student : { students :{some : { id : userId}}},
//    parent : { students : {some : { parentId : userId}}},

// }

// let data  = await prisma.announcement.findMany({
//   where :{
     
//    (...role !== "admin" && {
//      OR : [
//     {classId : null} , {
//       class : rolecondition[role as keyof typeof rolecondition]
//     }
//    ]
//    })
//   }
// })
const rolecondition = {
  teacher: { lessons: { some: { teacherId: userId! } } },
  student: { students: { some: { id: userId! } } },
  parent: { students: { some: { parentId: userId! } } },
} as const

const data = await prisma.announcement.findMany({
  take : 3,
  where  : {
    
    ...(role !== "admin" && {
      OR: [
        { classId: null },
        {
          class: rolecondition[role as keyof typeof rolecondition],
        },
      ],
    }),
  },
})


  return (
    <div className=' rounded-md bg-white p-4'>

       
        <div className=' flex flex-col gap-3 '>
            <div className=' flex justify-between items-center'>
                 <h1 className=' text-lg font-semibold'>Announcement</h1>
                 <span className=' text-xs text-gray-400 bg-white'>view more</span>
            </div>
            {
                data.map( item => (
                  <div key={
                    item.id
                  } className=' m-2 p-4    odd:bg-lamaSkyLight even:bg-lamaPurpleLight rounded-md '>
                    <div className=' flex justify-between items-center'>
                        <h1 className=' font-semibold text-gray-600 text-md'>{item.title}</h1>
                        <span className=' text-xs text-gray-400'>{Intl.DateTimeFormat().format(item.date)}</span>
                    </div>
                    <p className=' text-sm mt-2 text-gray-500'>{item.description}</p>
                  </div>
                ))
            }
        </div>
    </div>
  )
}

export default Announcement