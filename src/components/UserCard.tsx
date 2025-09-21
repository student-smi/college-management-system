//import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

const UserCard = async ({type} : {type : "admin" | "teacher" | "student" | "parents"}) => {

  const modelCard : Record< typeof  type , any>={
     admin : prisma.admin,
     teacher : prisma.teacher,
     student : prisma.student,
     parents : prisma.parent
  }

  let data = await modelCard[type].count();
  return (
    <div className='  rounded-2xl   odd:bg-lamaPurple   even:bg-lamaYellow p-4 flex-1 '>
        <div className=' flex justify-between items-center min-w-[110px]'>
             <span className=' text-xs  text-green-600 bg-white py-1 px-1  rounded-2xl'>2024/5</span> 
        <Image src="/more.png" alt='' width={20} height={20}/></div>
       
         <h1 className=' text-2xl font-semibold my-4'>{data}</h1>
         <h2 className='  capitalize  text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCard