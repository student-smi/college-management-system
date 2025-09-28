import z from "zod";

export const subjectschema = z.object({
   id: z.coerce.number().optional(),  // 👈 added for update
  name: z.string().min(1, { message: "first name is requird !" }),
  teachers : z.array(z.string())
});
export type  Subjectschema = z.infer<typeof subjectschema>;


export const classSchema = z.object({
   id: z.coerce.number().optional(),  // 👈 added for update
  name: z.string().min(1, { message: "first name is requird !" }),
  capacity: z.coerce.number().min(1, { message: "capcity is requird !" }),
  gradeId: z.coerce.number().min(1, { message: " grade is requird !" }),
  supervisorId : z.coerce.string().optional()
});
export type  ClassSchema = z.infer<typeof classSchema>;


export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }).optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }).optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId : z.coerce.number().min(1,{message :" grade is required!"}),
  classId : z.coerce.number().min(1,{message :" Class is required!"}),
  parentId : z.string().optional(),


});
export type StudentSchema = z.infer<typeof  studentSchema>;


export const examschema = z.object({
   id: z.coerce.number().optional(),  // 👈 added for update
   title: z.string().min(1, { message: "first name is requird !" }),
   startTime : z.coerce.date({message : "start date is requird ! "}),
   endTime : z.coerce.date({message : "end date is requird ! "}),

  lessonId : z.coerce.number({message :"lessonId is requird !"})


});
export type  Examschema = z.infer<typeof examschema>;



export const lessonschema = z.object({
     id: z.coerce.number().optional(),  
    title: z.string().min(1, { message: "Title is required!" }),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"], {
    message: "Day is required"
  }),
  // startTime: z.coerce.date({ message: "Start time is required!" }),
  // endTime: z.coerce.date({ message: "End time is required!" }),
   startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
  subjectId: z.coerce.number({ message: "subjectId is required!" }),
  teacherId: z.coerce.string({ message: "teacherId is required!" }),
  classId: z.coerce.number({ message: "classId is required!" }),
});
export type  Lessonschema = z.infer<typeof lessonschema>;



export const assignmentschema = z.object({
    id: z.coerce.number().optional(),  
    title: z.string().min(1, { message: "Title is required!" }),
    startTime : z.coerce.date({message : "start date is requird ! "}),
    endTime : z.coerce.date({message : "end date is requird ! "}),
    
     lessonId : z.coerce.number({message :"lessonId is requird !"})
})

export type Assignmentschema = z.infer<typeof assignmentschema>


export const announcementschema = z.object({
 id : z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description : z.string().min(1,{message :"Description is required!"}),
   date: z.preprocess((val) => new Date(val as string), z.date({
    message :"date is required !"
  })),
  classId : z.coerce.number({message:"classId is required !"}).optional()
})

export type AnnouncementSchema = z.infer<typeof announcementschema>


export const resultschema = z.object({
  id: z.coerce.number().optional(),
  examId: z.coerce.number({ message: "examId is required!" }),
  studentId: z.string({ message: "studentId is required!" }), // ✅ String
  examType: z.string().min(1, { message: "examtype is required!" }).optional(),
  score: z.coerce.number()
    .min(0, { message: "score must be >= 0" })
    .max(100, { message: "score must be <= 100" }), 
  assignmentId: z.string({ message: "AssignmentId is required!" }).optional(), 
  classId :z.string({ message: "classId is required!" }).optional(), 
  teacherId : z.string({ message: "teacherId is required!" }).optional(), 
})

export type ResultSchema = z.infer<typeof resultschema>


export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
 
  studentId : z.coerce.string({message : "studentId is requeired"})
});
export type ParentSchema = z.infer<typeof parentSchema>;
 
export const eventSchema = z.object({
  id : z.coerce.number().optional(),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
 
    startTime : z.coerce.date({message : "start date is requird ! "}),
   endTime : z.coerce.date({message : "end date is requird ! "}),
  classId: z.string().nonempty("Class is required"),
});

export type EventSchema = z.infer<typeof eventSchema>;


// export const attendanceRecordSchema = z.object({
//   studentId: z.coerce.number(),
//   present: z.boolean(),
// });

export const attendanceschema = z.object({
   id: z.coerce.number().optional(),  // 👈 added for update
     date: z.preprocess((val) => new Date(val as string), z.date({
    message :"date is required !"
  })),
  
  lessonId : z.string().min(1,{message :"lesson Id is requird !"}),
    studentId:z.string({ message: "studentId is required!" }), 
  present: z.boolean(),

});
export type  Attendanceschema = z.infer<typeof attendanceschema>;
