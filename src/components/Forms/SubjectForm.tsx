

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { subjectschema, Subjectschema } from "@/lib/SubjectSchemaValidetion";
// import { CreateSubject, UpdateSubject } from "@/lib/actions";
// import InputField from "../InputField";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const StudentForm = ({
//   type,
//   setIsOpen,
//   data,
//   renderData
// }: {
//   type: "create" | "update";
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   data?: any;
//    renderData ? : any
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Subjectschema>({
//     resolver: zodResolver(subjectschema),
//   });

//   // ✅ action bind ho jayega create/update ke hisab se
//   const [state, formAction] = React.useActionState(
//     type === "create" ? CreateSubject : UpdateSubject,
//     {
//       success: false,
//       error: false,
//     }
//   );
 
  
//   const onsubmit = handleSubmit((data) => {
//     console.log("Submitting: ", data);
//     formAction(data); // ✅ server action call
//   });

//   const router = useRouter();

//   // ✅ agar success mila toh toast + modal band + refresh
//   useEffect(() => {
//     if (state.success) {
//       toast(
//         `Subject is ${type === "create" ? "created ✅" : "updated ✨"}!`
//       );
//       router.refresh();
//       setIsOpen(false);
//     }
//   }, [state.success]);
//   //const {teachers} = renderDat
//   const teacher = renderData?.teachers || [];
//   return (
//     <form
//       action={formAction}
//       className="flex flex-col gap-8"
//       onSubmit={onsubmit}
//     >
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a subject" : "Update a subject"}
//       </h1>

//       <div className="flex justify-between items-center gap-2 flex-wrap">
//         {/* Update ke liye id bhi bhejna zaroori hai */}
//         {/* <input type="hidden" name="id" defaultValue={data?.id} /> */}
//    <input type="hidden" {...register("id")} defaultValue={data?.id} />

//         <InputField
//           type="text"
//           label="Subject Name"
//           register={register}
//           name="name"
//           error={errors.name}
//           defaultValue={data?.name}
//         />
//       </div>
//         <div className=" flex flex-col gap-5 w-full md:w-1/4">
//         <label className=" text-xs text-gray-500 ">teachers</label>
//        <select  className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none" {...register("teachers")} defaultValue={data?.teachers} multiple>
//           {
//             teacher.map((teacher :{id : string , name : string  ,  surname : string}) => (
//           <option value={teacher.id} key={teacher.id}>{teacher.name + " " + teacher.surname}</option>
//           ))}
        

//        </select>
//         {errors.teachers?.message && (
//           <p className=" text-xl text-red-500 ">{errors.teachers.message.toString()}</p>
//         )}
//       </div>
//       {state.error && (
//         <span className="text-red-500">Something went wrong 😢</span>
//       )}

//       <button className="p-2 rounded-md ring-1 ring-gray-400 text-white bg-blue-500">
//         {type === "create" ? "Submit" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default StudentForm;

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import toast from "react-toastify";
import { useRouter } from "next/navigation";
import { subjectschema, Subjectschema } from "@/lib/FromSchemaValidetion";
//import { subjectschema, Subjectschema } from "@/lib/subjectschema";
import { CreateSubject, UpdateSubject } from "@/lib/actions"; // apne actions ka path check kar lena
import InputField from "../InputField"; // apna custom input component
import { toast } from "react-toastify";

const StudentForm = ({
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
  } = useForm<Subjectschema>({
    resolver: zodResolver(subjectschema),
  });
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ? CreateSubject : UpdateSubject,
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
      toast(`subject is  ${ type === "create" ? "created" : "updated"}`)
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success , router]);

  // ✅ safe guard
  //const teachers = renderData?.teachers || [];

  return (
    <form onSubmit={onsubmit} className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a subject" : "Update a subject"}
      </h1>

      {/* Hidden ID for Update */}
      <input type="hidden" {...register("id")} defaultValue={data?.id} />

      {/* Subject Name */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="Subject Name"
          register={register}
          name="name"
          error={errors.name}
          defaultValue={data?.name}
        />
      </div>

      {/* Teachers Multiple Select */}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Teachers</label>
        <select
          {...register("teachers")}
          defaultValue={data?.teachers}
          multiple
          className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
        >
          {renderData?.teachers?.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name+ " " + teacher.surname}
              </option>
            )
          )}

          
        </select>
        {errors.teachers?.message && (
          <p className="text-sm text-red-500">
            {errors.teachers.message.toString()}
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

export default StudentForm;
