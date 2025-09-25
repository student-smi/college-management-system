

"use client";

import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { attendanceschema, Attendanceschema } from "@/lib/FromSchemaValidetion";

// import {
//   attendanceschema,
//   Attendanceschema,
// } from "@/lib/attendanceSchema";
import {
  CreateAttendance,
  UpdateAttendance,
} from "@/lib/actions";

const AttendanceForm = ({
  type,
  setIsOpen,
  data,
  renderData,
}: {
  type: "create" | "update";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
  renderData?: { lesson: { id: string; name: string }[]; student: { id: string; name: string; surname: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Attendanceschema>({
    resolver: zodResolver(attendanceschema),
    defaultValues: data || {},
  });

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = React.useActionState(
    type === "create" ? CreateAttendance : UpdateAttendance,
    { success: false, error: false }
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Attendance ${type === "create" ? "created" : "updated"} successfully!`
      );
      router.refresh();
      setIsOpen(false);
    }
  }, [state.success]);

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction(formData);
    });
  });

  const { lesson, student } = renderData || { lesson: [], student: [] };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Attendance" : "Update Attendance"}
      </h1>

      {type === "update" && (
        <input type="hidden" {...register("id")} defaultValue={data?.id} />
      )}

      {/* Date */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Date</label>
        <input
          type="date"
          {...register("date")}
          defaultValue={
            data?.date
              ? new Date(data.date).toISOString().substring(0, 10)
              : ""
          }
          className="p-2 rounded-md border"
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Lesson */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Lesson</label>
        <select
          {...register("lessonId")}
          defaultValue={data?.lessonId}
          className="p-2 rounded-md border"
        >
          {/* <option value="">-- Select Lesson --</option> */}
          {lesson?.map((l) => (
            <option key={l.id} value={l.id} selected={data && l.id ==  l.id}>
              {l.name}
            </option>
          ))}
        </select>
        {errors.lessonId && (
          <p className="text-sm text-red-500">{errors.lessonId.message}</p>
        )}
      </div>

      {/* Student */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500">Student</label>
        <select
       
          {...register("studentId")}
          defaultValue={data?.studentId}
          className="p-2 rounded-md border"
        >
         
          {student?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} {s.surname}
            </option>
          ))}
        </select>
        {errors.studentId && (
          <p className="text-sm text-red-500">{errors.studentId.message}</p>
        )}
      </div>

      {/* Present Checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("present")} />
        <label>Present</label>
      </div>

      {state.error && (
        <p className="text-sm text-red-500">Something went wrong 😢</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
      >
        {isPending
          ? "Saving..."
          : type === "create"
          ? "Submit"
          : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;

