

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { examschema, Examschema, lessonschema, Lessonschema, subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateExam, CreateSubject, UpdateExam, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";
import { error } from "console";

const LessonForm = ({
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
  } = useForm<Lessonschema>({
    resolver: zodResolver(lessonschema),
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
      toast(`Lesson is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success , router]);

  // ✅ safe guard
  const { class: className, teacher, subject } = renderData

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create Lesson" : "Update a Lesson"}
      </h1>

      {/* Hidden ID for Update */}
      <input type="hidden" {...register("id")} defaultValue={data?.id} />

      {/* Subject Name */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="Title"
          register={register}
          name="title"
          error={errors.title}
          defaultValue={data?.title}
        />
     <div>
    <label className="text-xs text-gray-500">Day</label>
    <select
      {...register("day")}
      defaultValue={data?.day}
      className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400"
    >
      <option value="">Select Day</option>
      <option value="MONDAY">Monday</option>
      <option value="TUESDAY">Tuesday</option>
      <option value="WEDNESDAY">Wednesday</option>
      <option value="THURSDAY">Thursday</option>
      <option value="FRIDAY">Friday</option>
      <option value="SATURDAY">Saturday</option>
    </select>
    {errors.day && <p className="text-sm text-red-500">{errors.day.message}</p>}
  </div>
         <InputField
          type="time"
          label="Start time"
          register={register}
          name="startTime"
          error={errors.startTime}
          defaultValue={data?.startTime}
        />
      </div>

      <div className=" flex flex-wrap gap-5 justify-between">
        <InputField
          type="time"
          label="End time"
          register={register}
          name="endTime"
          error={errors.endTime}
          defaultValue={data?.endTime}
        />
     

      <div className="flex flex-col gap-2 w-full md:w-1/4 ">
        <label className="text-xs text-gray-500">Subject</label>
        <select
          {...register("subjectId")}
          defaultValue={data?.subjectId}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {subject?.map(
            (sub : { id: string; name: string; }) => (
              <option value={sub.id} key={sub.id}>
                {sub.name}
              </option>
            )
          )}

          
        </select>
        {errors.subjectId?.message && (
          <p className="text-sm text-red-500">
            {errors.subjectId.message.toString()}
          </p>
        )}
      </div>

         <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Class</label>
        <select
          {...register("classId")}
          defaultValue={data?.classId}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {className?.map(
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

export default  LessonForm
