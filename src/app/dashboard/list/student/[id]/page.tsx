import Announcement from "@/components/Announcement";
import BigCelender from "@/components/BigCelender";
import FromCon from "@/components/FromCon";
import PerformanceChart from "@/components/PerformanceChart";
import StudentAttendanceBox from "@/components/StudentAttendanceBox";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Student, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { includes } from "zod";


const SingleStudentPage =async ({params:{id}} :{params :{id : string}}) => {
  let student : Student & {class : ( Class & {_count : {lessons : number}})} | null = await prisma.student.findUnique({
    where: {id},
    include :{
      class : {
        include :{
          _count :{
              select :{
                lessons : true
              }
          }
        }
      }
    }
  })
  if(!student){
    return notFound
  }
    const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <div className=" flex  bg-white flex-col xl:flex-row p-4 gap-4 ">
      {/* left */}
      <div className=" w-full xl:w-2/3">
        {/* top */}
        <div className=" flex flex-col lg:flex-row gap-4 ">
          {/* user card */}
          <div className=" bg-lamaSky py-4 px-3  xl:w-[55%]  flex gap-4">
            {/* image */}
            <div className="w-1/2">
              <img
                src={student.img || "/avatar.png"}
                alt=""
                height={144}
                width={144}
                className=" h-36 w-36 rounded-full "
              />
            </div>
            {/* right pro */}
            <div className=" w-2/3 flex   flex-col gap-2 justify-between ">
              <h1 className=" text-xl font-semibold">{student.name + " " +student.surname}</h1>
              {
                role === "admin" && <FromCon  type="update" table="student" data={student}/>
              }
              <p className=" text-sm text-gray-500">
                {student.address}
              </p>
              <div  className=" flex items-center flex-wrap justify-between gap-2 text-xs font-semibold">
                <div className=" w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image src="/blood.png" alt="" height={14} width={14} />
                  <span>{student.bloodType }</span>
                </div>
                  <div className=" w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image src="/date.png" alt="" height={14} width={14} />
                  <span>May 2025</span>
                </div>
                  <div className=" w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image src="/mail.png" alt="" height={14} width={14} />
                  <span>{student.email + "-"}</span>
                </div>
                  <div className=" w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2">
                  <Image src="/phone.png" alt="" height={14} width={14} />
                  <span>{student.phone + "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* small card */}
          <div className="   xl:w-[45%] flex justify-between  flex-wrap gap-2">
            <div className=" flex  items-center w-full md:w-[48%] gap-4 xl:w-[45%] 2xl:w-[48%] bg-white">
               <Image src="/singleAttendance.png" alt="" width={14} height={14} className=" w-8 h-8"/>
               <Suspense fallback="loding...">
                <StudentAttendanceBox id={student.id}/>
               </Suspense>
             
            </div>
            <div className=" flex  items-center  w-full md:w-[48%] gap-4 xl:w-[45%] 2xl:w-[48%] bg-white">
               <Image src="/singleClass.png" alt="" width={14} height={14} className=" w-8 h-8"/>
               <div className=" flex flex-col">
                 <h1 className=" text-xl font-semibold">{student.class.name.charAt(0)}th</h1>
                 <span className="  text-sm ">Grade</span>
               </div>
            </div>

            <div className=" flex  items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] bg-white">
               <Image src="/singleBranch.png" alt="" width={14} height={14} className=" w-8 h-8"/>
               <div className=" flex flex-col">
                 <h1 className=" text-xl font-semibold">{student.class.name}</h1>
                 <span className="  text-sm ">Class</span>
               </div>
            </div>

            <div className=" flex   bg-white items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
               <Image src="/singleLesson.png" alt="" width={14} height={14} className=" w-8 h-8"/>
               <div className=" flex flex-col">
                 <h1 className=" text-xl font-semibold">{student.class._count.lessons}</h1>
                 <span className="  text-sm ">Lesson</span>
               </div>
            </div>
            
          </div>
        </div>
        {/* bottom */}
        <div className=" mt-4 rounded-md bg-white  p-4 h-[800px]">  
          <h1>teacher's schedule</h1>
          <BigCelender/>
        </div>
      </div>
      {/* right */}
      <div className=" w-full xl:w-1/3 flex flex-col gap-4" >
      <div className=" bg-white p-4 rounded-md gap-3 ">
        <h1 className=" text-xl  font-semibold">Schedule</h1>
        <div className=" mt-4  text-xs p-4 flex flex-wrap gap-5">
          <Link href={`/dashboard/list/classes?classId=${2}`} className=" p-3 rounded-md  bg-lamaSkyLight">Student's class </Link>
           <Link href={`/dashboard/list/lessons?classId=${2}`} className=" p-3 rounded-md  bg-lamaPurpleLight">Student's Lesson </Link>
            <Link href={`/dashboard/list/teacher?classId=${2}`} className=" p-3 rounded-md  bg-lamaYellowLight">Student's teacher </Link>
             <Link href={`/dashboard/list/exams?classId=${2}`} className=" p-3 rounded-md  bg-pink-50">Student's exam </Link>
              <Link href={`/dashboard/list/assignments?classId=${2}`} className=" p-3 rounded-md bg-red-50">Student's assinments</Link>

        </div>
      </div>
      <PerformanceChart/>
      <Announcement/>
      </div>
    </div>
  );
};

export default  SingleStudentPage
