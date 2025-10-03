import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { classesData, role, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Grade, Prisma, Teacher } from "@prisma/client";
import { strict } from "assert";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type classesList = classes & { supervisor : Teacher} & {grade : Grade}
let cloumn = [
  {
    header: "Classes name",
    accesor: "info",
    className: "",
  },

  {
    header: "Capacity",
    accesor: " capacity",
     className: " hidden md:table-cell",
  },

  {
    header: "Grade",
    accesor: "grade",
    className: " hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accesor: "supervisor",
    className: "",
  },
 
  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

type classes =  {
   id : number,
  
   name : string,
    capacity : number,
    grade : string ,
    supervisor :string


}

   const reanderRow =async (item : classesList)=> {
      const { sessionClaims } = await auth();
      
      const role = (sessionClaims?.metadata as { role?: string })?.role;
      
     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" ">
            
            {item.name}
           
           
           
          </td>

          <td className=" hidden  md:table-cell">
            {item.capacity}
          </td>
          <td className="  text-sm  hidden   md:table-cell">{item.grade.level}</td>
          <td className="">{item.supervisor.name + " "+ item.supervisor.surname}</td>
         
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
              {

            role === "admin" &&   
              <><FromCon type="update" table="class" id={item.id} data={item}/>
              <FromCon type="delete" table="class" id={item.id} /></>

          }
          </td>

       </tr>
     )
   }

const classesList =async ( {searchParams} : {searchParams : { [key : string] : string | undefined}}) => {
     const { sessionClaims } = await auth();
     
     const role = (sessionClaims?.metadata as { role?: string })?.role;
    
    const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.ClassWhereInput=  {} 

    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value!==undefined){
          switch (key) {
          
            case "supervisorId" :
              query.supervisorId = value;
              break;

             case  "search" :
              query.name = {
                contains : value , mode:"insensitive"

              } ;
              break;

          } 
           
        }
      }
    }

if(role == "teacher"){
   query.supervisorId = sessionClaims?.sub; 
}

  let [data , count]= await prisma.$transaction([
    prisma.class.findMany({
      where :query,
    include: {
      supervisor: true,
      grade : true
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.class.count({where: query})
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
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
              {

            role === "admin" &&   
              <FromCon type="create" table="class" />
             

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

export default classesList
