import { prisma } from "@/lib/prisma";
import React from "react";

const StudentAttendanceBox = async ({ id }: { id: string }) => {
   const attendance = await prisma.attendance.findMany({
    where :{
        studentId: id,
         date : {
            gte : new Date( new Date().getFullYear(), 0, 1 )
         }
    }
   })
   const total = attendance.length
   const presentDay = attendance.filter(s=>s.present).length
   const per = (total / presentDay) * 100
  return (
    <>
      <div className=" flex flex-col">
        <h1 className=" text-xl font-semibold">{per || "-"}%</h1>
        <span className="  text-sm ">Attendance</span>
      </div>
    </>
  );
};

export default StudentAttendanceBox;
