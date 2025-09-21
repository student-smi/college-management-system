"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
//import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
    let route = useRouter()
useEffect(()=>{
      if(value instanceof Date){
        route.push(`?date=${value}`)
      }
},[value , route ])

  return (
    
      
           <Calendar onChange={onChange} value={value} className="  w-full" />
    
        
     
  )
}

export default EventCalendar