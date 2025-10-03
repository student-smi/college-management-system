

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { assignmentschema, Assignmentschema, examschema, Examschema, subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateAssignment, CreateExam, CreateSubject, UpdateAssignment, UpdateExam, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";

const AssignmentForm = ({
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
  } = useForm<Assignmentschema>({
    resolver: zodResolver(assignmentschema),
  });
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ? CreateAssignment : UpdateAssignment,
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
      toast.success(`Assignment is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success , router]);

  // ✅ safe guard
  const {assignment , class : className}= renderData

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a Assignment" : "Update a Assignment"}
      </h1>

      {/* Hidden ID for Update */}
      <input type="hidden" {...register("id")} defaultValue={data?.id} />

      {/* Subject Name */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="exam name"
          register={register}
          name="title"
          error={errors.title}
          defaultValue={data?.title}
        />
         <InputField
          type="Date"
          label="Start time"
          register={register}
          name="startTime"
          error={errors.startTime}
          defaultValue={data?.startTime}
        />
         <InputField
          type="Date"
          label="End time"
          register={register}
          name="endTime"
          error={errors.endTime}
          defaultValue={data?.endTime}
        />
      </div>
{/* <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Class name</label>
        <select
          {...register("classId")}
          defaultValue={data?.classId}
 
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {className?.map(
            (teacher: { id: number; name: string; }) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            )
          )}

          
        </select>
        {errors.classId?.message && (
          <p className="text-sm text-red-500">
            {errors.classId.message.toString()}
          </p>
        )}
      </div> */}
      {/* Teachers Multiple Select */}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Lessions</label>
        <select
          {...register("lessonId")}
          defaultValue={data?.lessonId}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {assignment?.map(
            (teacher: { id: number; name: string; }) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            )
          )}

          
        </select>
        {errors.lessonId?.message && (
          <p className="text-sm text-red-500">
            {errors.lessonId.message.toString()}
          </p>
        )}
      </div>

      {/* Error */}
      {state.error && (
        <span className="text-red-500">Something went wrong 😢</span>
      )}

      {/* Submit Button */}
        <button className="p-2 rounded-md ring-1 ring-gray-400 text-white bg-blue-500 hover:bg-blue-600 transition" disabled={isPending}>
         {
          isPending ? "Saving..." : type == "create" ? "Submit" : "update"
         }
      </button>
    </form>
  );
};

export default AssignmentForm