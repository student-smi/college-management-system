

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { classSchema, ClassSchema, subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateClass, CreateSubject, UpdateClass, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";

const ClassForm = ({
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
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ?  CreateClass : UpdateClass,
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
      toast(`class is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success]);

  // ✅ safe guard
  const {teachers , grade} =  renderData

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a subject" : "Update a subject"}
      </h1>

      {/* Hidden ID for Update */}
     {type === "update" && (
  <input type="hidden" {...register("id")} defaultValue={data?.id} />
)}
      {/* Subject Name */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="Class Name"
          register={register}
          name="name"
          error={errors.name}
          defaultValue={data?.name}
        />
      </div>
       <div className="flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="Capcity"
          register={register}
          name="capacity"
          error={errors.capacity}
          defaultValue={data?.capacity}
        />
      </div>

      {/* Teachers Multiple Select */}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Supervisor</label>
        <select
          {...register("supervisorId")}
          defaultValue={data?.supervisorId}
    
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {teachers?.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option value={teacher.id} key={teacher.id} selected={data && teacher.id == teacher.id}>
                {teacher.name+ " " + teacher.surname}
              </option>
            )
          )}

          
        </select>
        {errors.supervisorId?.message && (
          <p className="text-sm text-red-500">
            {errors.supervisorId.message.toString()}
          </p>
        )}
      </div>

<div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Grade</label>
        <select
          {...register("gradeId")}
          defaultValue={data?.gradeId}
          
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {grade?.map(
            ( grade: { id: string; level : number }) => (
              <option value={grade.id} key={grade.id} selected={data && grade.id == grade.id} >
                { grade.level}
              </option>
            )
          )}

          
        </select>
        {errors.gradeId?.message && (
          <p className="text-sm text-red-500">
            {errors.gradeId.message.toString()}
          </p>
        )}
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

export default  ClassForm
