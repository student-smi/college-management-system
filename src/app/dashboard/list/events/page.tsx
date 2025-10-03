import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, classesData, eventsData, examsData, lessonsData, role, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Event, Prisma } from "@prisma/client";
import { strict } from "assert";
import Image from "next/image";
import Link from "next/link";
import React from "react";

let cloumn = [
  {
    header: "Title",
    accesor: "info",
    className: "",
  },
 {
    header: "Description",
    accesor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accesor: "Class",
     className: "",
  },


  {
    header: "Date",
    accesor: "Date",
    className: " hidden md:table-cell",
  },
  
    {
    header: "Start Date",
    accesor: "Startdate",
    className: " hidden md:table-cell",
  },
    {
    header: "End Date",
    accesor: "enddate",
    className: " hidden md:table-cell",
  },
  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

type  eventsList = Event& {class : Class}

 const reanderRow =async (item :eventsList)=> {
     const { sessionClaims } = await auth();
     
     const role = (sessionClaims?.metadata as { role?: string })?.role;
    
     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" ">
            
            {item.title}
           
           
           
          </td>
         <td className=" text-sm  hidden   md:table-cell">
            
            {item.description}
           
           
           
          </td>
          <td >
            {item.class?.name || "-"}
          </td>
          <td className="  text-sm  hidden   md:table-cell">{Intl.DateTimeFormat().format(item.startTime)}</td>
                  <td className="  text-sm  hidden   md:table-cell">{item.startTime.toLocaleTimeString()}</td>
                            <td className="  text-sm  hidden   md:table-cell">{item.endTime.toLocaleTimeString()}</td>


         
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
            {

            role === "admin" &&   
              <><FromCon type="update" table="event" id={item.id} data={item} />
              <FromCon type="delete" table="event" id={item.id} /></>

          }
          </td>

       </tr>
     )
   }
const eventsList =async ({searchParams} : {searchParams : {[key : string] : string | undefined}}) => {
     const { sessionClaims , userId } = await auth();
     
     const role = (sessionClaims?.metadata as { role?: string })?.role;
     

    const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.EventWhereInput =  {} 

    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value){
          switch (key) {
          
           

             case  "search" :
              query.title = {
                contains : value , mode:"insensitive"

              } ;
              break;

          } 
           
        }
      }
    }


const rolcondition = {
  teacher : { lessons : {some : { teacherId :  userId!}}},
  student: { students : {some : { id :  userId!}}},
  parent : { students : {some : { parentId :  userId!}}},
   

}

query.OR = [
  {classId : null},
  {
    class : rolcondition[role! as keyof typeof rolcondition] || {},
  } 
]

  let [data , count]= await prisma.$transaction([
    prisma.event.findMany({
      where :query,
    include: {
     class : true
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.event.count({where: query})
  ]) 
  


  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">All Events</h1>
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

            role === "admin" &&   
           
              <FromCon type="create" table="event"  />

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

export default  eventsList
