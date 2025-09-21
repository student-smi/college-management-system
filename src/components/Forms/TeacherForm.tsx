import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z, { email, file } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, TeacherSchema } from "@/lib/FromSchemaValidetion";
import { useRouter } from "next/navigation";
import { CreateTeacher, UpdateTeacher } from "@/lib/actions";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
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
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });
  // const onsubmit = handleSubmit((data) => {
  //   console.log(data);
  // });

  const [img, setimg] = useState<any>();

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ?  CreateTeacher : UpdateTeacher,
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
      toast(` teacher is  ${type === "create" ? "created" : "updated"}`);
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success]);
  const { subject } = renderData;
  return (
    <form action="" className=" flex flex-col gap-8 " onSubmit={onsubmit}>
      <h1 className="  text-xl  font-semibold">{`${
        type === "create" ? "Create a teacher" : "update a Teacher"
      }`}</h1>
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
          defaultValue={data?.birthday}
        />
        <InputField
          type="text"
          label="Blood Type"
          register={register}
          name="bloodtype"
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
          <label className=" text-xs text-gray-500 ">Subject</label>
          <select
            className="w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none"
            {...register("subjects")}
            defaultValue={data?.subjects}
            multiple
          >
            {subject.map((s: { id: number; name: string }) => (
              <option value={s.id} key={s.id}  selected={data?.subjects?.includes(s.id)}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className=" text-xl text-red-500 ">
              {errors.subjects.message.toString()}
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
      <button className=" p-2 rounded-md ring-1 ring-gray-400 text-white bg-blue-500">
        {type === "create" ? "submit" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
