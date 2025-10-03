"use client"
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";

import "react-big-calendar/lib/css/react-big-calendar.css"; // if using DnD
import { useState } from "react";
const localizer = momentLocalizer(moment);

const BigCelender = ({data} : {data : {title : string ; start : Date ; end : Date}[]}) => {
    let [view , setview] = useState<View>(Views.WORK_WEEK)

    function hendleChengeView(selected : View){
        setview(selected)
    }
    return (
         <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week" , "day"]}
      view={view}
      min={new Date(2025 , 1 , 0 ,8 ,0 ,0 ,0 )}
      max={new Date(2025 , 1 , 0 ,17 ,0 ,0 ,0 )}

      style={{ height: "98%" }}
      onView={hendleChengeView}

    />
    )
}   

export default BigCelender;
