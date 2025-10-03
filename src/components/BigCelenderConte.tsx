import { prisma } from '@/lib/prisma'
import React from 'react'
import BigCelender from './BigCelender'

const BigCelenderConte =async ({type , id} : {type : "teacherId"  | "ClassId" , id : string | number}) => {
    let resdata = await prisma.lesson.findMany({
        where :{
            ...(type === "teacherId"  ? {teacherId : id as string | undefined} : { classId : id as number})
        }
    })

    let data = resdata.map(lesson => ({
        title : lesson.name,
        start : lesson.startTime,
        end : lesson.endTime
    }
    ))
  return (
    <div>
        
        <BigCelender data={data}/>

    </div>
  )
}

export default BigCelenderConte