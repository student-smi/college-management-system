"use client"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';




import React from 'react'
import Image from 'next/image';
import { count } from 'console';

const CountCart = ({boys , girls} : {boys : number , girls: number}) => {
  const data = [
     {
  
      name: 'Total',
      count: boys + girls,
    
      fill: "white",
    },
    {
  
      name: 'Girls',
      count: girls,
    
      fill: '#FAE27C',
    },
    {
      name: 'Boys',
       count: boys,
    
      fill: '#C3EBFA',
    },
  
    
  
  ];
  return (
    
      
        <div className=' w-full h-[75%] focus:outline-none relative'>
            {/* carts */}
            
             <ResponsiveContainer >
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={20} data={data}>
          <RadialBar
           
            // label={{ position: 'insideStart', fill: '#fff' }}
            background
           
            dataKey="count"
          />
        
        </RadialBarChart>
      </ResponsiveContainer>
      <Image  src="/maleFemale.png" alt='' height={50} width={50} className=' absolute  top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'/>
        </div>
      
    
  )
}

export default CountCart