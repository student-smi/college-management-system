// import Formdata from "@/components/Formdata";
// import FromCon from "@/components/FromCon";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import {

//   resultsData
 
// } from "@/lib/data";
// import { ITEM_PER_PAGE } from "@/lib/Item_per_page";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { Prisma } from "@prisma/client";
// import { strict } from "assert";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// let cloumn = [
//   {
//     header: "Date",
//     accesor: "Date",
//     className: "",
//   },

//   {
//     header: "Lesson",
//     accesor: "Lesson",
//     className: " hidden md:table-cell",
//   },

//   {
//     header: "Student",
//     accesor: "Student",
//     className: "",
//   },
//   {
//     header: "Present",
//     accesor: "Paresent",
//     className: "",
//   },
 
  
//   {
//     header: "Actions",
//     accesor: "actions",
//     className: "",
//   },
// ];

// type results = {
//   id     : number,
//   date     : string,
//   present   : boolean,
//   lesson : string
    
//   student : string
 
// };



//  const reanderRow =async (item: results) => {
//   const { sessionClaims } = await auth();
  
//   const role = (sessionClaims?.metadata as { role?: string })?.role;
//     return (
//       <tr
//         key={item.id}
//         className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight"
//       >
//         <td className=" ">{item.student}</td>

//         <td>{item.class}</td>
//         <td className="  text-sm  hidden   md:table-cell">{item.}</td>
//         <td className="  text-sm  hidden   md:table-cell">{item.student}</td>
//         <td className="  text-sm  hidden   md:table-cell">{item.date}</td>
//         <td className="  text-sm  hidden   md:table-cell">{item.type}</td>
//         <td className="  text-sm  hidden   md:table-cell">{item.score}</td>

//         <td className=" flex  justify-center items-center gap-2  text-sm">
//           {/* <Link href={`/dashboard/list/teacher/${item.id}`}>
//             <button className=" w-7 h-7 flex   items-center   justify-center  rounded-full bg-lamaSky">
//               <Image src="/view.png" alt="" width={14} height={14} />
//             </button>
//           </Link>
//           {role === "admin" && (
//             <button className=" w-7 h-7 flex  items-center   justify-center  rounded-full bg-lamaPurple">
//               <Image src="/delete.png" alt="" width={14} height={14} />
//             </button>
//           )} */}
//           {

//             role === "admin" &&   
//               <><FromCon type="update" table="attendance" id={item.id} />
//               <FromCon type="delete" table="attendance" id={item.id} /></>

//           }
//         </td>
//       </tr>
//     );
//   };
// const AttendanceList =async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//   const { sessionClaims } = await auth();
  
//   const role = (sessionClaims?.metadata as { role?: string })?.role;
// const { page, ...queryParams } = searchParams;
//   let p = page ? parseInt(page) : 1;

//   const query: Prisma.AttendanceWhereInput = {};
//   query.lesson = {};
//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value) {
//         switch (key) {
         
//           case "search":
//             query.lesson = {
//               subject: {
//                 name: { contains: value, mode: "insensitive" },
//               },
//             };
//             break;
//         }
//       }
//     }
//   }

 
//   let [data, count] = await prisma.$transaction([
//     prisma.attendance.findMany({
//       where: query,
//       include: {
//         student :{select : {name : true , id:true}},
//         lesson: {
//           select :{
//             id : true,
//             name : true
//           }
//         },
//       },

//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (p - 1),
//     }),
//     prisma.attendance.count({ where: query }),
//   ]);

 

//   return (
//     <div className=" flex-1 items-center rounded-md bg-white m-4 ">
//       {/* heading */}
//       <div className=" flex justify-between items-center ">
//         <h1 className="  hidden md:block text-lg font-semibold">All Attendance</h1>
//         <div className=" flex flex-col  md:flex-row gap-3  w-full md:w-auto">
//           <TableSearch />
//           <div className=" flex  items-center w-full md:w-auto  justify-end  gap-2">
//             <button className=" rounded-full p-2 bg-lamaYellow   ">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className=" rounded-full p-2 bg-lamaYellow  ">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {
//               role == "admin" &&  <FromCon type="create" table="attendance" ></FromCon>
//             }
//             {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
//               <Image src="/plus.png" alt="" width={14} height={14} />
//             </button> */}
//           </div>
//         </div>
//       </div>
//       {/* list of techaer */}
//       <div>
//         {/* <Table cloumn={cloumn} reanderRow={reanderRow} data={resultsData} /> */}
//       </div>
//       {/* footer */}
//       <div>
//         <Pagination  page={p} count={count} />
//       </div> 
//     </div>
//   );
// };

// export default AttendanceList;
// "use client";

import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import FromCon from "@/components/FromCon";
import { ITEM_PER_PAGE } from "@/lib/Item_per_page";

type Result = {
  id: number;
  date: string;
  present: boolean;
  lesson: string;
  student: string;
};

const columns = [
  { header: "Date", accessor: "date", className: ""  ,   accesor: "Date"},
  { header: "Lesson", accessor: "lesson", className: "hidden md:table-cell" ,  accesor: "lesson" },
  { header: "Student", accessor: "student", className: "" ,   accesor: "studnet" },
  { header: "Present", accessor: "present", className: "" ,  accesor: "present", },
  { header: "Actions", accessor: "actions", className: "" ,  accesor: "actions" },
];

const AttendanceList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // Build Prisma query
  const query: Prisma.AttendanceWhereInput = {};
  // if (queryParams.search) {
  //   query.lesson = {
  //     name: { contains: queryParams.search, mode: "insensitive" },
  //   };

  
  // }
    if(queryParams){
        for(const [key ,value] of Object.entries(queryParams)){
          if(value){
            switch (key) {
            
           
  
               case  "search" :
                query.OR = [
                  {lesson :{name :{contains : value , mode:"insensitive"}}},
                  {student :{name : {contains : value  , mode : "insensitive"}}}

                ]
  
            } 
             
          }
        }
      }


  // Fetch data from Prisma
  const [rawData, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: { select: { name: true } },
        lesson: { select: { name: true } },
         
      },
      take: 4,
      skip: 4* (p - 1),
      orderBy: { date: "desc" },
    }),
    prisma.attendance.count({ where: query }),
  ]);

  // Map data to display format
  const data: Result[] = rawData.map((d) => ({
    id: d.id,
    date: d.date.toISOString().split("T")[0],
    present: d.present,
    lesson: d.lesson.name,
    student: d.student.name,
  }));

  // Render table rows
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="even:bg-slate-100 border-b border-gray-200 hover:bg-lamaPurpleLight"
    >
      <td>{item.date}</td>
      <td className="hidden md:table-cell">{item.lesson}</td>
      <td>{item.student}</td>
      <td>{item.present ? "Yes" : "No"}</td>
      <td className="flex justify-center items-center gap-2 text-sm">
        {role === "admin" && (
          <>
            <FromCon type="update" table="attendance" id={item.id} data={item} />
            <FromCon type="delete" table="attendance" id={item.id} />
          </>
        )}
      </td>
    </tr>
  );

  return (
    <div className="flex-1 items-center rounded-md bg-white m-4 p-4">
      {/* Heading */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="hidden md:block text-lg font-semibold">All Attendance</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center w-full md:w-auto justify-end gap-2">
            <button className="rounded-full p-2 bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="rounded-full p-2 bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FromCon type="create" table="attendance" />}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table cloumn={columns} reanderRow={() => data.map(renderRow)} data={data} />

      {/* Pagination */}
      <div className="mt-4">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default AttendanceList;
