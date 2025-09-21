"use client"
import Image from 'next/image';
import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 80 ,fill : "#CFCEFF" },
  { name: 'Group B', value: 90 ,fill :  "#C3EBFA"},
  
];

const PerformanceChart = () => {
  return (
    <div className='  rounded-md bg-white h-80 p-4  relative'>
     <div className=' flex justify-between items-center'>
          <h1 className=' text-xl font-semibold'>Performance</h1>
          <Image  src="/moreDark.png" alt='' height={14} width={14}/>
         </div>
        <ResponsiveContainer width="100%" height="100%">
      <PieChart >
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          fill="#8884d8"
          label
        />
      </PieChart>
    </ResponsiveContainer>
    <div  className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <h1 className=' text-2xl font-bold'>90</h1>
        <p className=' text-xs text-gray-500'>bc Score no 1</p>
    </div>
    <h2 className=' font-medium absolute  bottom-16 left-0 right-0  m-auto text-center'>1 Sem  to 2 Sem</h2>
    </div>
  )
}

export default PerformanceChart