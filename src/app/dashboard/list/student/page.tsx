import Formdata from "@/components/Formdata";
import FromCon from "@/components/FromCon";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
//import { role, studentsData, teachersData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { object } from "zod";

type StudentList = Student &  { class: Class };

let cloumn = [
  {
    header: "Info",
    accesor: "info",
    className: "",
  },
  {
    header: "Student ID",
    accesor: "studentId",
    className: " hidden md:table-cell",
  },
   {
    header: "User name",
    accesor: "USername",
    className: "",
  },
  {
    header: "Grade",
    accesor: "grade",
    className: " hidden md:table-cell",
  },

  
//   {
//     header: "Class",
//     accesor: "class",
//     className: " hidden md:table-cell",
//   },
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

// type  student=  {
//    id : number,
//    studentId: string ,
//    name : string,
//    email? : string,
//    photo : string,
//    phone : string,
   
//    class : string,
//    address : string ,

// }

   const reanderRow =async (item : StudentList)=> {
    const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
     return (
       <tr key={item.id} className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight">
          <td className=" flex gap-3   object-cover ">
            
            <Image src={item.img || "/avatar.png"} alt="" width={40} height={40} className=" md:hidden xl:block  rounded-full object-cover"/>
             <div className=" flex  flex-col items-center  text-sm">
              <h2 className=" font-semibold ">{item.name}</h2>
              <p className=" text-xs text-gray-500 ">{item?.class.name}</p>
            </div>
          
           
          </td>

          <td className=" hidden  md:table-cell">
            {item.id}
          </td>
          {/* <td className="  text-sm  hidden   md:table-cell">{item.subjects.join(",")}</td> */}
           <td className="">{item.username}</td>
          <td className="text-sm hidden  md:table-cell">{item.class.name[0]}</td>
          <td className=" text-sm hidden  md:table-cell">{item.phone}</td>
          <td className=" text-sm hidden  md:table-cell" >{item.address}</td>
          
          <td className=" flex  justify-center items-center gap-2  text-sm">
            <Link  href={`/dashboard/list/student/${item.id}`} >
             <button className=" w-7 h-7 flex   items-center   justify-center  rounded-full bg-lamaSky">
              <Image  src="/view.png" alt="" width={14} height={14} />
            </button>
         

            </Link>
              {
            role === "admin" &&
            <button  className=" w-7 h-7 flex  items-center   justify-center  rounded-full bg-lamaPurple"> 
              {/* <Image  src="/delete.png" alt="" width={14} height={14}/> */}
                 <FromCon  type="delete" table="student" id={item.id}/>
            </button>

           }
          </td>

       </tr>
     )
   }

const studentList = async ( {searchParams} : { searchParams : { [ket :string] : string | undefined}}) => {
   const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
    const {page , ...queryParams} = searchParams
    let p = page ? parseInt(page) : 1 
 
     let query : Prisma.StudentWhereInput= {}
    
     if(queryParams){
        for(const [key , value] of Object.entries(queryParams)){
           if(value){
           switch (key){
           case "search" : 
           query.name ={
           contains : value,  mode :"insensitive"
           }; break;
           case "teacherId" : 
             query.class = {
               lessons : {
                some : {
                  teacherId : value
                }
               }
             }
           }
           }
        }
     }

if (role === "teacher") {
  query.class = {
   lessons :{
    some :{
      teacherId : sessionClaims?.sub
    }
   }
  };
}

  let [data ,count] = await prisma.$transaction([
     
    prisma.student.findMany({
      where : query,
      include :{
        class:true
      },
      take : ITEM_PER_PAGE ,
      skip : ITEM_PER_PAGE *  (p -1)

      
    }),

     prisma.student.count({where:query})
  ])

 
  return (
    <div className=" flex-1 items-center rounded-md bg-white m-4 ">
      {/* heading */}
      <div className=" flex justify-between items-center ">
        <h1 className="  hidden md:block text-lg font-semibold">Student</h1>
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
              role == "admin" &&    <FromCon  type="create" table="student" />
            }
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
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

export default  studentList
