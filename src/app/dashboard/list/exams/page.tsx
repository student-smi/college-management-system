import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { classesData, examsData, lessonsData, role, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Exam, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import { strict } from "assert";
import Image from "next/image";
import Link from "next/link";
import React from "react";

let cloumn = [
  {
    header: "Student name",
    accesor: "info",
    className: "",
  },

  {
    header: "Class",
    accesor: "Class",
     className: "",
  },

  {
    header: "teacher",
    accesor: "techer",
    className: " hidden md:table-cell",
  },
    {
    header: "Date",
    accesor: "date",
    className: " hidden md:table-cell",
  },
  
 
  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

type ExamsList = Exam & {
  lesson: {
    teacher: Teacher;
    class: Class;
    subject: Subject;
  };
};
 const reanderRow =async (item : ExamsList)=> { 
   const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  

     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" ">
            
            {item.lesson.subject.name}
           
           
           
          </td>

          <td >
            {item.lesson.class.name}
          </td>
          <td className="  text-sm  hidden   md:table-cell">{item.lesson.teacher.name + " " +item.lesson.teacher.surname}</td>
          <td className="  text-sm  hidden   md:table-cell">{Intl.DateTimeFormat().format(item.startTime)}</td>

        
         
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
              {

           (role === "admin" || role === "teacher")  &&   
              <><FromCon type="update" table="exam" id={item.id} data={item} />
              <FromCon type="delete" table="exam" id={item.id} /></>

          }
          </td>

       </tr>
     )
   }

const ExamsList =async ({searchParams} : {searchParams : {[key : string] : string | undefined}}) => {
  const { sessionClaims  , userId} = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.ExamWhereInput =  {} 
 query.lesson = {}
    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value){
          switch (key) {
          
           case "teacherId" :
            query.lesson.teacherId = value
            
             break;
             
            case "classId" :
            query.lesson.classId = parseInt(value)
            
            break;
             case  "search" :
              query.lesson.subject ={
                  name : {contains : value , mode : "insensitive"}
                 }

            
              break;

          } 
           
        }
      }
    }

    switch (role) {
      case "admin":
        
        break;

        case "teacher" :
          query.lesson.teacherId = userId!
          break;

             case "student" :
          query.lesson.class= {
            students : {
              some :{
                id : userId!
              }
            }
          }
          break;
    
            case "parent" :
          query.lesson.class= {
            students : {
              some :{
                parentId : userId!
              }
            }
          }
          break;
    
      default:
        break;
    }
 
  let [data , count]= await prisma.$transaction([
    prisma.exam.findMany({
      where :query,
    include: {
      lesson : {select :{
        class : {select : {name: true}},
        subject : {select :{name :true}},
        teacher : {select : {name :true , surname :true} ,
        
      }}
      }
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.exam.count({where: query})
  ]) 
  

  

  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">All classes</h1>
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

             (role === "admin" || role === "teacher") &&   
               <FromCon  type="create" table="exam" />

          }
          </div>
        </div>
      </div>
      {/* list of techaer */}
      <div>
        <Table   cloumn={cloumn} reanderRow={reanderRow} data={data}/>
      </div>
      {/* footer */}
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default  ExamsList
