import Formdata from "@/components/Formdata";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { role, teachersData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parentList from "../parent/page";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { object } from "zod";
import { auth } from "@clerk/nextjs/server";
import FromCon from "@/components/FromCon";

type teacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

let cloumn = [
  {
    header: "Info",
    accesor: "info",
    className: "",
  },
  {
    header: "Teacher ID",
    accesor: "teacherId",
    className: " hidden md:table-cell",
  },
  {
    header: "Students",
    accesor: "students",
    className: " hidden md:table-cell",
  },

  {
    header: "Classes",
    accesor: "classes",
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

// type Teacher =  {
//    id : number,
//    teacherId: string ,
//    name : string,
//    email? : string,
//    photo : string,
//    phone : string,
//    subjects : string[],
//    classes : string[],
//    address : string ,

// }
const reanderRow =async (item: teacherList) => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <tr
      key={item.id}
      className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight"
    >
      <td className=" flex gap-3   object-cover ">
        <Image
          src={ "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className=" md:hidden xl:block  rounded-full object-cover"
        />
        <div className=" flex  flex-col items-center  text-sm">
          <h2 className=" font-semibold ">{item.name}</h2>
          <p className=" text-xs text-gray-500 ">{item?.email}</p>
        </div>
      </td>

      <td className=" hidden  md:table-cell">{item.id}</td>
      <td className="  text-sm  hidden   md:table-cell">
        {item.subjects.map((subject) => subject.name).join(",")}
      </td>
      <td className="text-sm hidden  md:table-cell">
        {item.classes.map((classess) => classess.name).join(",")}
      </td>
      <td className=" text-sm hidden  md:table-cell">{item.phone}</td>
      <td className=" text-sm hidden  md:table-cell">{item.address}</td>

      <td className=" flex  justify-center items-center gap-2  text-sm">
        <Link href={`/dashboard/list/teacher/${item.id}`}>
          <button className=" w-7 h-7 flex   items-center   justify-center  rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={14} height={14} />
          </button>
        </Link>
        {role === "admin" && <FromCon type="delete" table="teacher"  id={item.id}/>}
      </td>
    </tr>
  );
};


// where conditions



const teacherList = async ({searchParams}: { searchParams: { [key: string]: string | undefined } }) => {
  // console.log(searchParams);
   

  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
   const {page , ...queryParams} = searchParams
   let p = page ? parseInt(page) : 1

 const  query: Prisma.TeacherWhereInput =  {} 

    if(queryParams){
      for(const [key ,value] of Object.entries(queryParams)){
        if(value){
          switch (key) {
          
            case "classId" :
              query.lessons = {
                some : {
                  classId : parseInt(value)
                }

              };
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

//     if (role === "teacher") {
//   query.lessons = {
//     some: {
//       teacherId: sessionClaims?.sub, // 👈 Clerk ka teacherId (current user ka id)
//     },
//   };
// }

  let [data , count]= await prisma.$transaction([
    prisma.teacher.findMany({
      where :query,
    include: {
      subjects: true,
      classes: true,
    },

    take : ITEM_PER_PAGE,
    skip : ITEM_PER_PAGE * (p - 1) 
  }),
    prisma.teacher.count({where: query})
  ]) 
  
  
 // console.log("teacher ", data);

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
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
            {role === "admin" && <FromCon type="create" table="teacher" />}
          </div>
        </div>
      </div>
      {/* list of techaer */}
      <div>
        <Table cloumn={cloumn} reanderRow={reanderRow} data={data} />
      </div>
      {/* footer */}
      <div>
        <Pagination  page={p}  count={count}/>
      </div>
    </div>
  );
};

export default teacherList;
