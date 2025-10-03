//import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
"use client";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Mon', present: 40, absent: 10 },
//   { name: 'Tue', present: 35, absent: 15 },
//   { name: 'Wed', present: 30, absent: 20 },
//   { name: 'Thu', present: 38, absent: 12 },
//   { name: 'Fri', present: 42, absent: 8 },
//   { name: 'Sat', present: 28, absent: 22 },

// ];



import React from 'react'

const Attendance = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
   
        <div className=' w-full h-full'>
        <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        barSize={20}
        data={data}
       
      >
        <CartesianGrid strokeDasharray="3 3"  />
        <XAxis dataKey="name"  />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill="#FAE27C"  />
        <Bar dataKey="absent" fill="#C3EBFA"  />
      </BarChart>
    </ResponsiveContainer>

        </div>
  
  )
}

export default Attendance