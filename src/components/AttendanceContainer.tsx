"use client"
import React from 'react'
import Attendance from './Attendance'
import Image from 'next/image'

const AttendanceContainer = () => {
  return (
      <div className=' bg-white rounded-lg'>
            <div className=' flex justify-between items-center py-2 mt-2.5'>
                <h1 className=' text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
            <Attendance/>
        </div>
  )
}

export default AttendanceContainer