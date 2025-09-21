import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { role, subjectsData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type subjectlist = Subject & {teachers : Teacher[]}

let cloumn = [
  {
    header: "Subject Name",
    accesor: "subject",
    className: "",
  },
  {
    header: "Teachers",
    accesor: "teachers",
    className: " hidden md:table-cell",
  },

  {
    header: "Actions",
    accesor: "actions",
    className: "",
  },
];

// type subject = {
//   id: number;

//   name: string;
//   teachers: string[];
// };
  const reanderRow =async (item: subjectlist ) => {
    const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
    return (
      <tr
        key={item.id}
        className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight"
      >
        <td className=" ">{item.name}</td>
        <td>{item.teachers.map(t=>t.name).join(",")}</td>

        <td className=" flex  justify-center items-center gap-2  text-sm">
          {role == "admin" && (
            <FromCon type="update" table="subject" id={item.id}  data={item}/>
          )}

          {role === "admin" && (
            <FromCon type="delete" id={item.id} table="subject" />
          )}
        </td>
      </tr>
    );
  };

const subjectList = async ({searchParams} : {searchParams : { [key : string] : string | undefined}}) => {
   const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
     const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.SubjectWhereInput =  {} 

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
    prisma.subject.findMany({
      where :query,
    include: {
      teachers : true
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.subject.count({where: query})
  ]) 
  

  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">Teachers</h1>
        <div className=" flex flex-col  md:flex-row gap-3  w-full md:w-auto">
          <TableSearch />
          <div className=" flex  items-center w-full md:w-auto  justify-end  gap-2">
            <button className=" rounded-full p-2 bg-lamaYellow   ">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role == "admin" && <FromCon type="create" table="subject" />}
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
        <Pagination  page={p} count={count}/>
      </div>
    </div>
  );
};

export default subjectList;
