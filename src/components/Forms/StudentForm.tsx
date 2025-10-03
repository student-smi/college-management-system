import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z, { email, file } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { studentSchema, StudentSchema, teacherSchema, TeacherSchema } from "@/lib/FromSchemaValidetion";
import { useRouter } from "next/navigation";
import { CreateStudent, CreateTeacher, UpdateStudent, UpdateTeacher } from "@/lib/actions";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const StudentForm = ({
  type,
  setIsOpen,
  renderData,
  data,
}: {
  type: "create" | "update";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderData: any;
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });
  // const onsubmit = handleSubmit((data) => {
  //   console.log(data);
  // });

  const [img, setimg] = useState<any>();

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ?  CreateStudent :  UpdateStudent,
    {
      success: false,
      error: false,
    }
  );

  

  const onsubmit = handleSubmit((data) => {
    console.log("Submitting: ", data);
    startTransition(() => {
      // 👈 transition ke andar call
      formAction({...data , img: img?.secure_url});
    });
    // formAction(formdata);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(` student is  ${type === "create" ? "created" : "updated"}`);
      router.refresh();
      setIsOpen(false);
    }
     if (state.error) {
      toast.error(typeof state.error === "string" ? state.error : "Something went wrong ❌");
    }
  }, [state.success , state.error]);
  const {  classes , grades , parent } = renderData;
  return (
    <form action="" className=" flex flex-col gap-8 " onSubmit={onsubmit}>
      <h1 className="  text-xl  font-semibold">{`${
        type === "create" ? "Create a student" : "update a student"
      }`}</h1>
     
      {type === "update" && (
  <input type="hidden" {...register("id")} defaultValue={data?.id} />
)}

      <span className=" textxs font-medium text-gray-500">
        Authontication informetion
      </span>
      <div className=" flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="Username"
          register={register}
          name="username"
          error={errors.username}
          defaultValue={data?.username}
        />
        <InputField
          type="email"
          label="Email"
          register={register}
          name="email"
          error={errors.email}
          defaultValue={data?.email}
        />
        <InputField
          type="password"
          label="Password"
          register={register}
          name="password"
          error={errors.password}
          defaultValue={data?.password}
        />
           {type === "update" && (
  <input type="hidden" {...register("id")} defaultValue={data?.id} />
)}
      </div>
      <span className=" text-xs font-medium text-gray-500">
        personal informetion
      </span>
      <div className=" flex justify-between items-center gap-2 flex-wrap">
        <InputField
          type="text"
          label="First name"
          register={register}
          name="name"
          error={errors.name}
          defaultValue={data?.name}
        />
        <InputField
          type="text"
          label="last name"
          register={register}
          name="surname"
          error={errors.surname}
          defaultValue={data?.surname}
        />
        <InputField
          type="text"
          label="Phone"
          register={register}
          name="phone"
          error={errors.phone}
          defaultValue={data?.phone}
        />
        <InputField
          type="text"
          label="address"
          register={register}
          name="address"
          error={errors.address}
          defaultValue={data?.address}
        />

        <InputField
          type="Date"
          label="Brith day "
          register={register}
          name="birthday"
          error={errors.birthday}
          defaultValue={data?.birthday.toISOString().split("T")[0]}
        />
         {/* <InputField
          type="text"
          label="ParentID"
          register={register}
          name="parentId"
          error={errors.parentId}
          defaultValue={data?.parentId}
        /> */}
           <div className=" flex flex-col gap-5 w-full md:w-1/4">
          <label className=" text-xs text-gray-500 ">Parent</label>
          <select
            className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
            {...register("parentId")}
            defaultValue={data?.parentId}
      
          >
            {parent.map((s: { id: string;  name :string ; }) => (
              <option value={s.id} key={s.id}  >
                {s.name } 
              </option>
            ))}
          </select>
          {errors.parentId?.message && (
            <p className=" text-xl text-red-500 ">
              {errors.parentId.message.toString()}
            </p>
          )}
        </div>

        <InputField
          type="text"
          label="Blood Type"
          register={register}
          name="bloodType"
          error={errors.bloodType}
          defaultValue={data?.bloodType}
        />
      </div>
      <div className=" flex justify-between items-center gap-4">
        <div className=" flex flex-col gap-5 w-full md:w-1/4">
          <label className=" text-xs text-gray-500 ">Sex</label>
          <select
            className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className=" text-xl text-red-500 ">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className=" flex flex-col gap-5 w-full md:w-1/4">
          <label className=" text-xs text-gray-500 ">Grade</label>
          <select
            className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
           
          >
            {grades.map((s: { id: number; level : number }) => (
              <option value={s.id} key={s.id}  >
                {s.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className=" text-xl text-red-500 ">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
         <div className=" flex flex-col gap-5 w-full md:w-1/4">
          <label className=" text-xs text-gray-500 ">Class</label>
          <select
            className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
            {...register("classId")}
            defaultValue={data?.classId}
           
          >
            {classes.map((s: { id: string;  name :string ; capacity : number , _count : {students : number} }) => (
              <option value={s.id} key={s.id}  >
                {s.name } - {" "} {s._count.students + " /" + s.capacity } {" "} capcity 
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className=" text-xl text-red-500 ">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>

        <CldUploadWidget
          uploadPreset="college"
          onSuccess={(r, { widget}) =>{ setimg(r.info); widget.close() }} 
        >
          {({ open }) => {
            return (
              <div
                className=" flex items-center gap-2 text-xs text-gray-500  cursor-pointer "
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" height={14} width={14} />
                <p>Choose a image</p>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
          {state.error && (
        <span className="text-red-500">Something went wrong 😢</span>
      )}
       <button className="p-2 rounded-md ring-1 ring-gray-400 text-white bg-blue-500 hover:bg-blue-600 transition" disabled={isPending}>
         {
          isPending ? "Saving..." : type == "create" ? "Submit" : "update"
         }
      </button>
    </form>
  );
};

export default StudentForm
