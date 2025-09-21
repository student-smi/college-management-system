
import { prisma } from '@/lib/prisma'
import React from 'react'

const Event =async ({dateParams} : {dateParams : string | undefined}) => {
    let date = dateParams ? new Date(dateParams) : new Date()
 
    const data = await prisma.event.findMany({
        take : 3 ,
        where : {
            startTime :{
                gte : new Date(date.setHours(0,0,0,0)),
                lte: new Date(date.setHours(23,59,59,999))
            }
        }
    })
  return (
    <div>
          {
                data.map( item => (
                  <div key={
                    item.id
                  } className=' m-2 p-2  rounded-md  border-t-4  border-gray-500  odd:border-lamaSky even:border-lamaYellow'>
                    <div className=' flex justify-between items-center'>
                        <h1 className=' font-semibold text-gray-600 text-md'>{item.title}</h1>
                        <span className=' text-xs text-gray-400'>{item.startTime.toLocaleDateString()}</span>
                    </div>
                    <p className=' text-sm mt-2 text-gray-500'>{item.description}</p>
                  </div>
                ))
            }
    </div>
  )
}

export default Event