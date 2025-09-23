

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { examschema, Examschema, lessonschema, Lessonschema, resultschema, ResultSchema, subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateExam, CreateSubject, UpdateExam, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";
import { error } from "console";

const ResultForm = ({
  type,
  setIsOpen,
  data,
  renderData,
}: {
  type: "create" | "update";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
  renderData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultschema),
  });
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ? CreateExam : UpdateExam,
    {
      success: false,
      error: false,
    }
  );

  const onsubmit = handleSubmit((data) => {
    console.log("Submitting: ", data);
     startTransition(() => { // 👈 transition ke andar call
      formAction(data);
    });
   // formAction(formdata);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Result is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success , router]);

  // ✅ safe guard
  const { classs , teacher, student , exam } = renderData

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create Result" : "Update a result"}
      </h1>

      {/* Hidden ID for Update */}
      <input type="hidden" {...register("id")} defaultValue={data?.id} />

      {/* Subject Name */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
       
  
            <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">exam</label>
        <select
          {...register("examId")}
          defaultValue={data?.examId}
        
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {exam?.map(
            (sub : { id: string; name: string; }) => (
              <option value={sub.id} key={sub.id}>
                {sub.name} 
              </option>
            )
          )}

          
        </select>
        {errors.examId?.message && (
          <p className="text-sm text-red-500">
            {errors.examId.message.toString()}
          </p>
        )}
      </div>

     


         <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Class name</label>
        <select
          {...register("classId")}
          defaultValue={data?.classId}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {classs?.map(
            (sub : { id: number; name: string; }) => (
              <option value={sub.id} key={sub.id}>
                {sub.name} 
              </option>
            )
          )}

      
        </select>
        {errors.classId?.message && (
          <p className="text-sm text-red-500">
            {errors.classId.message.toString()}
          </p>
        )}
      </div>


             <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Teacher</label>
        <select
          {...register("teacherId")}
          defaultValue={data?.teacherId}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {teacher?.map(
            (sub : { id: string; name: string; surname : string}) => (
              <option value={sub.id} key={sub.id}>
                {sub.name} {sub.surname}
              </option>
            )
          )}

          
        </select>
        {errors.teacherId?.message && (
          <p className="text-sm text-red-500">
            {errors.teacherId.message.toString()}
          </p>
        )}
      </div>

            <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Student name</label>
        <select
          {...register("studentId")}
          defaultValue={data?.studentId}
        
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {student?.map(
            (sub : { id: string; name: string; surname : string}) => (
              <option value={sub.id} key={sub.id}>
                {sub.name} {sub.surname}
              </option>
            )
          )}

          
        </select>
        {errors.studentId?.message && (
          <p className="text-sm text-red-500">
            {errors.studentId.message.toString()}
          </p>
        )}
      </div>


            <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">exam type</label>
        <select
          {...register("examType")}
          defaultValue={data?.examType}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
         
        
         <option value="final">final</option>
         <option value="Midterm">Midterm</option>
         <option value="unit">unit test</option>



          
        </select>
        {errors.examType?.message && (
          <p className="text-sm text-red-500">
            {errors.examType.message.toString()}
          </p>
        )}
      </div>

      <InputField
        type="number"
        label="Score"
        register={register}
        name="score"
        error={errors.score}
        defaultValue={data?.score}
      />

</div>
      {/* Error */}
      {state.error && (
        <span className="text-red-500">Something went wrong 😢</span>
      )}

      {/* Submit Button */}
      <button className="p-2 rounded-md ring-1 ring-gray-400 text-white bg-blue-500 hover:bg-blue-600 transition">
        {type === "create" ? "Submit" : "Update"}
      </button>
    </form>
  );
};

export default  ResultForm
