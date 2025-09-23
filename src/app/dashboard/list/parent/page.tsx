import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { parentsData, role, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ParentList =  Parent & {students : Student[]}

let cloumn = [
  {
    header: "Info",
    accesor: "info",
    className: "",
  },

  {
    header: "Students name",
    accesor: "students",
    className: " hidden md:table-cell",
  },

  
  {
    header: "Phone",
    accesor: "Phone",
    className: " hidden lg:table-cell",
  },
  {
    header: "Address",
    accesor: "address",
    className: " hidden lg:table-cell",
  },
  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

// type parents =  {
//    id : number,
//    name : string,
//    email? : string,
   
//    students : string[],
//    phone : string,
  
//    address : string ,

// }

   const reanderRow =async (item : ParentList)=> {
    const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" flex gap-3   object-cover ">
            
             <div className=" flex  flex-col items-center  text-sm">
              <h2 className=" font-semibold ">{item.name}</h2>
              <p className=" text-xs text-gray-500 ">{item?.email}</p>
            </div>
          
           
          </td>

          
          <td className="  text-sm  hidden   md:table-cell">{item.students.map(s=>(s.name)).join(",")}</td>
        
          <td className=" text-sm hidden  md:table-cell">{item.phone}</td>
          <td className=" text-sm hidden  md:table-cell" >{item.address}</td>
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
           
             {

            role === "admin" &&   
              <><FromCon type="update" table="parent" id={item.id}  data={item}/>
              <FromCon type="delete" table="parent" id={item.id} /></>

          }
          </td>

       </tr>
     )
   }

const parentList =async ({searchParams} : {searchParams : { [key : string] : string | undefined}}) => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
      const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.ParentWhereInput =  {} 

    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value){
          switch (key) {
          
            
             case  "search" :
              query.name = {
                contains : value , mode:"insensitive"

              } ;
              break;

          } 
           
        }
      }
    }

  let [data , count]= await prisma.$transaction([
    prisma.parent.findMany({
      where :query,
    include: {
     students : true
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.parent.count({where: query})
  ]) 
  


  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">All Parents</h1>
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
              
              <FromCon type="create" table="parent" />

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
        <Pagination page={p} count={count}/>
      </div>
    </div>
  );
};

export default  parentList
