import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {

  resultsData
 
} from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { strict } from "assert";
import Image from "next/image";
import Link from "next/link";
import React from "react";

let cloumn = [
  {
    header: "Result name",
    accesor: "info",
    className: "",
  },

  {
    header: "Teacher name",
    accesor: "teacher",
    className: " hidden md:table-cell",
  },

  {
    header: "Student name",
    accesor: "student",
    className: "",
  },
  {
    header: "Date",
    accesor: "Date",
    className: " hidden md:table-cell",
  },
  {
    header: "class",
    accesor: "class",
    className: " hidden md:table-cell",
  },
 
  {
    header: "Score",
    accesor: "score",
    className: " hidden md:table-cell",
  },
  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

// type results = {
//   id: number;

//   subject: string;
//   class: number;
//   teacher: string;
//   student: string;
//   date: string;
//   type: "exam" | "assigment";
//   score: number;
// };
type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};
 const reanderRow =async (item: ResultList) => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
    return (
      <tr
        key={item.id}
        className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight"
      >
        <td className=" ">{item.title}</td>

       
        <td className="  text-sm  hidden   md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
        <td className="  ">{item.studentName + " " + item.studentSurname}</td>
        <td className="  text-sm  hidden   md:table-cell"> {new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.className}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.score}</td>

        <td className=" flex  justify-center items-center gap-2  text-sm">
          {/* <Link href={`/dashboard/list/teacher/${item.id}`}>
            <button className=" w-7 h-7 flex   items-center   justify-center  rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={14} height={14} />
            </button>
          </Link>
          {role === "admin" && (
            <button className=" w-7 h-7 flex  items-center   justify-center  rounded-full bg-lamaPurple">
              <Image src="/delete.png" alt="" width={14} height={14} />
            </button>
          )} */}
          {

            role === "admin" &&   
              <><FromCon type="update" table="result" id={item.id} data={item} />
              <FromCon type="delete" table="result" id={item.id} /></>

          }
        </td>
      </tr>
    );
  };
const resultsList =async ({searchParams} : {searchParams : { [key : string] : string | undefined}}) => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
 
      const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.ResultWhereInput =  {} 

    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value){
          switch (key) {
           case "studentId":
            query.studentId = value
            break

          case "search" :
            query.OR =[
              {exam : {title :{contains :value , mode : "insensitive"}}},
              {student : {name :{contains :value , mode :"insensitive"}}}
            ]

          } 
           
        }
      }
    }

  let [dataRes , count]= await prisma.$transaction([
    prisma.result.findMany({
      where :query,
    include: {
     student : {select :{ name : true , surname : true}},
     exam :{
      include :{
        lesson :{
          include:{
             teacher :{select :{ name : true , surname : true}},
             class : {select : {name:true}}
          }
        }
      }
     },
     assignment :{
      include :{
        lesson :{
          include:{
             teacher :{select :{ name : true , surname : true}},
             class : {select : {name:true}}
          }
        }
      }
     }
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.result.count({where: query})
  ]) 
 
     const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });        

  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">Results</h1>
        <div className=" flex flex-col  md:flex-row gap-3  w-full md:w-auto">
          <TableSearch />
          <div className=" flex  items-center w-full md:w-auto  justify-end  gap-2">
            <button className=" rounded-full p-2 bg-lamaYellow   ">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {
              role == "admin" &&  <FromCon type="create" table="result" ></FromCon>
            }
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
          </div>
        </div>
      </div>
      {/* list of techaer */}
      <div>
        <Table cloumn={cloumn} reanderRow={reanderRow} data={data} />
      </div>
      {/* footer */}
      <div>
        <Pagination page={p} count={count}  />
      </div>
    </div>
  );
};

export default resultsList;
