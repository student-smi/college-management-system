

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { announcementschema, AnnouncementSchema, eventSchema, EventSchema, examschema, Examschema, lessonschema, Lessonschema, subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateEvent, CreateExam, CreateSubject, UpdateEvent, UpdateExam, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";


const  EventForm = ({
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
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ? CreateEvent : UpdateEvent,
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
      toast(`Event is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success , router]);

  // ✅ safe guard
  const { event } = renderData

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create event" : "Update a event"}
      </h1>

      {/* Hidden ID for Update */}
      <input type="hidden" {...register("id")} defaultValue={data?.id} />

      {/* Subject Name */}
      <div className="flex  items-center justify-between gap-2 flex-wrap">
        <InputField
          type="text"
          label="Title"
          register={register}
          name="title"
          error={errors.title}
          defaultValue={data?.title}
        />

     
          <div className=' flex flex-col gap-5 w-full md:w-1/4'>
        <label className=' text-xs text-gray-500 '>description</label>
         < textarea {...register("description")} className=' w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none'
         defaultValue={data?.description}/>
         {errors.description?.message && <p className=' text-xs text-red-500 '>{errors.description?.message?.toString()}</p>}
    </div>
       
         <InputField
          type="datetime-local"
          label="start time"
          register={register}
          name="startTime"
          error={errors.startTime}
          defaultValue={
         data?.startTime 
      ? new Date(data.startTime).toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
      : ""
  

          }
        />
  <InputField
          type="datetime-local"
          label="end time"
          register={register}
          name="endTime"
          error={errors.endTime}
          defaultValue={   data?.startTime 
      ? new Date(data.startTime).toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
      : ""
  }
        />
        
      <div className="flex flex-col gap-2 w-full md:w-1/4 ">
        <label className="text-xs text-gray-500">class</label>
        <select
          {...register("classId")}
          defaultValue={data?.classId}
         
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {event?.map(
            (sub : { id: number; name: string; }) => (
              <option value={sub.id} key={sub.id} >
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
      </div>

      {/* <div className=" flex flex-wrap gap-5 justify-between    ">
       
     


       

      
</div> */}
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

export default  EventForm
