



"use client";
import { DeleteAnnouncement, DeleteAssignment, DeleteAttendance, DeleteClass, DeleteEvent, DeleteExam, DeleteLesson, DeleteResult, DeleteStudent, DeleteSubject, DeleteTeahcher } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormModel } from "./FromCon";
//import AttendanceForm from "./Forms/AttendanceFrom";
//import ResultForm from "";
//import parentForm from "";
//import announcementForm from "./Forms/AnnouncementFrom";
//import AssignmentForm from "./Forms/AssignmentForm";



const TeacherForm = dynamic(()=>import( "./Forms/TeacherForm") ,{
  loading :()=> <h1>
    loading...
  </h1>
})
const StudentForm  = dynamic(()=>import( "./Forms/StudentForm") ,{
    loading :()=> <h1>
    loading...
  </h1>
})
const SubjectForm  = dynamic(()=>import( "./Forms/SubjectForm") ,{
    loading :()=> <h1>
    loading...
  </h1>
})
const ClassFrom  = dynamic(()=>import( "./Forms/ClassForm") ,{
    loading :()=> <h1>
    loading...
  </h1>
})
const ExamFrom  = dynamic(()=>import( "./Forms/ExamForm") ,{
    loading :()=> <h1>
    loading...
  </h1>
})

const LessonFrom  = dynamic(()=>import( "./Forms/LessonFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})

const AssignmentFrom  = dynamic(()=>import( "./Forms/AssignmentForm") ,{
    loading :()=> <h1>
    loading...
  </h1>
})

const AnnouncementFrom  = dynamic(()=>import("./Forms/AnnouncementFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})


const ParentFrom  = dynamic(()=>import("./Forms/ParentFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})
const ResultFrom  = dynamic(()=>import("./Forms/ResultFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})


const EventFrom  = dynamic(()=>import("./Forms/EventFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})

const AttendanceForm= dynamic(()=>import("./Forms/AttendanceFrom") ,{
    loading :()=> <h1>
    loading...
  </h1>
})
const form: {
  [key: string]: (
    type: "create" | "update",
    
 setIsOpen :React.Dispatch<React.SetStateAction<boolean>>,
    data?: any ,
   renderData? : any
  ) =>  JSX.Element
} = {
  subject: (type: "create" | "update",  setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any  ,  renderData? : any) => <SubjectForm type={type} setIsOpen={setIsOpen}   data={data}    renderData={renderData}    />,
  class: (type: "create" | "update",  setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any  ,  renderData? : any) => <ClassFrom type={type} setIsOpen={setIsOpen}   data={data}    renderData={renderData}    />,

  teacher: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> , data?: any , renderData? : any) => <TeacherForm type={type}   setIsOpen={setIsOpen}   data={data}     renderData={renderData}   />,
  student: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <StudentForm type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
  exam: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <ExamFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
lesson: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <LessonFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
assignment: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <AssignmentFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
announcement: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <AnnouncementFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
parent: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <ParentFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
result: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <ResultFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
event: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <EventFrom type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,
attendance: (type: "create" | "update", setIsOpen :React.Dispatch<React.SetStateAction<boolean>> ,data?: any , renderData? : any ) => <AttendanceForm type={type}  setIsOpen={setIsOpen}    data={data}    renderData={renderData}  />,


}; 


const deleteActionMap  = {
  subject: DeleteSubject,
  class: DeleteClass,
  teacher: DeleteTeahcher,
  student: DeleteStudent,
  exam: DeleteExam,

//  parent: deleteSubject,
   lesson: DeleteLesson,
  assignment: DeleteAssignment,
  result: DeleteResult,
 attendance: DeleteAttendance,
  event: DeleteEvent,
 announcement: DeleteAnnouncement,
};
type TableKeys = keyof typeof form; 

const Formdata = ({
  type,
  data,
  table,
  id,
  renderData
}: FormModel  & {renderData? : any ; table : TableKeys}) => {
  const [isOpen, setIsOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  // Lock scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
 
    const [state, formAction] = React.useActionState(
       deleteActionMap[table] ,
    {
      success: false,
      error: false,
    }
  );
   let router = useRouter()
  useEffect(() => {
    if (state.success) {
      toast(
        `${table} is ${
          type === "create" ? "created ✅" : type === "update" ? "updated ✨" : "deleted ❌"
        }!`
      );
      router.refresh()
      setIsOpen(false);
    }
  }, [state.success , router]);

  function Form() {
    if (type === "delete" && id) {
      return (
        <form action={formAction} className="p-6 flex flex-col gap-4">
          {/* <input type="text | number" value={id} name="id" hidden /> */}
           <input type="hidden" name="id" defaultValue={id} />
          <h1 className="text-lg font-semibold text-red-600">
            Delete {table} #{id}?
          </h1>
          <p className="text-sm text-gray-500">
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              type="submit"
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      );
    }
    
    return <div className="p-6">
      {
        (type === "create" || type === "update") && form[table]

          ? form[table]( type,  setIsOpen , data , renderData )
          : "form not found"
      }
    </div>;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${size} flex items-center justify-center rounded-full ${bgColor} hover:opacity-80 transition`}
      >
        <Image src={`/${type}.png`} alt="" width={14} height={14} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center   justify-center bg-black/50">
          {/* Modal Box */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <Image src="/close.png" alt="" height={14} width={14} />
            </button>

            {/* Form */}
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default Formdata;
