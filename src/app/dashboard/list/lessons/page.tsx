import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// { classesData, lessonsData, role, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import { strict } from "assert";
import Image from "next/image";
import Link from "next/link";
import React from "react";

let cloumn = [
  {
    header: "Lesson name",
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
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

type  lessonslist = Lesson & {teacher : Teacher} & {subject : Subject} & {class : Class}

 const reanderRow =async (item : lessonslist)=> {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" ">
            
            {item.subject.name}
           
           
           
          </td>

          <td >
            {item.class.name}
          </td>
          
          <td className="  text-sm  hidden   md:table-cell">{item.teacher.name + " " + item.teacher.surname}</td>
        
         
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
           
             {

            role === "admin" &&   
              <><FromCon type="update" table="lesson" id={item.id}  data={item}/>
              <FromCon type="delete" table="lesson" id={item.id} /></>

          }
          </td>

       </tr>
     )
   }


const lessonsList =async ({searchParams} : {searchParams : { [key : string] :string | undefined}}) => {
     const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
    const {page , ...queryParams} = searchParams
     let p = page ? parseInt(page) : 1
  
   const  query: Prisma.LessonWhereInput =  {} 
  
      if(queryParams){
        for(const [key ,value] of Object.entries(queryParams)){
          if(value){
            switch (key) {
            
             case "teacherId" :
              query.teacherId = value;
              break;

              case "classId" :
                 query.classId = parseInt(value);
              break;
  
               case  "search" :
                query.OR = [
                  {subject : {name : {  contains : value , mode:"insensitive"}}},
                  {teacher : {name : {  contains : value , mode:"insensitive"}}}

                ]
  
            } 
             
          }
        }
      }

      if (role === "teacher") {
       query.teacherId = sessionClaims?.sub;
}
  
    let [data , count]= await prisma.$transaction([
      prisma.lesson.findMany({
        where :query,
      include: {
        subject :{select : {name : true}},
        class :{select : {name : true}},
        teacher :{select : {name : true , surname : true}}



      },
  
      take : ITEM_PER_PAGE,
      skip : ITEM_PER_PAGE * (p - 1) 
    }),
      prisma.lesson.count({where: query})
    ]) 
    
  
  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className=" flex flex-col  md:flex-row gap-3  w-full md:w-auto">
          <TableSearch />
          <div className=" flex  items-center w-full md:w-auto  justify-end  gap-2">
            <button className=" rounded-full p-2 bg-lamaYellow   ">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
              {

            role === "admin" &&   
             
              <FromCon type="create" table="lesson"  />

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
        <Pagination page={p} count={ count} />
      </div>
    </div>
  );
};

export default  lessonsList
