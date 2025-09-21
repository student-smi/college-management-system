import Formdata from "@/components/Formdata";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {

  resultsData
 
} from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
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
    header: "Student",
    accesor: "student",
    className: " hidden md:table-cell",
  },
  {
    header: "Date",
    accesor: "Date",
    className: " hidden md:table-cell",
  },
  {
    header: "Type",
    accesor: "type",
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

type results = {
  id: number;

  subject: string;
  class: number;
  teacher: string;
  student: string;
  date: string;
  type: string;
  score: number;
};
 const reanderRow =async (item: results) => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
    return (
      <tr
        key={item.id}
        className="  even:bg-slate-100 gap-4  border-b  border-gray-200 hover:bg-lamaPurpleLight"
      >
        <td className=" ">{item.subject}</td>

        <td>{item.class}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.teacher}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.student}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.date}</td>
        <td className="  text-sm  hidden   md:table-cell">{item.type}</td>
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
              <><Formdata type="update" table="result" id={item.id} />
              <Formdata type="delete" table="result" id={item.id} /></>

          }
        </td>
      </tr>
    );
  };
const resultsList =async () => {
  const { sessionClaims } = await auth();
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;

 

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
              role == "admin" &&  <Formdata type="create" table="result" ></Formdata>
            }
            {/* <button className=" rounded-full p-2 bg-lamaYellow  ">
              <Image src="/plus.png" alt="" width={14} height={14} />
            </button> */}
          </div>
        </div>
      </div>
      {/* list of techaer */}
      <div>
        <Table cloumn={cloumn} reanderRow={reanderRow} data={resultsData} />
      </div>
      {/* footer */}
      <div>
        <Pagination  />
      </div>
    </div>
  );
};

export default resultsList;
