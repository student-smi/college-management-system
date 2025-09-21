"use server"

import { date } from "zod/v3";
import { prisma } from "./prisma";
import { ClassSchema, Examschema, StudentSchema, Subjectschema, TeacherSchema } from "./FromSchemaValidetion";

// import { clerkClient } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });


//import { id } from "zod/locales";

// export const async function CreateSubject(data:Subjectschema) {
//     console.log( data , " in server ");
    
// }
export async function CreateSubject(curruntState : {success :  boolean , error : boolean} ,data: Subjectschema) {
 try {
     await prisma.subject.create({
        data : {
             name : data.name,
             teachers :{
               connect : data.teachers.map( teacherId =>({id: teacherId}) )
             }
        }
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function UpdateSubject(curruntState : {success :  boolean , error : boolean} ,data: Subjectschema) {
      //const subjectId = typeof data.id === "string" ? parseInt(data.id) : data.id;

   
 try {
     await prisma.subject.update({
        where :{
           id : Number(data.id)
        },
        data : {
             name : data.name,
              teachers :{
               set : data.teachers.map( teacherId =>({id: teacherId}) )
             }
        }
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function DeleteSubject(curruntState : {success :  boolean , error : boolean} ,data: FormData) {
    const id = data.get("id") as string
 try {
     await prisma.subject.delete({
        where :{
           id :  parseInt(id)
        },
       
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}


export async function  CreateClass(curruntState : {success :  boolean , error : boolean} ,data: ClassSchema) {
 try {
     await prisma.class.create({
        data 
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function UpdateClass(curruntState : {success :  boolean , error : boolean} ,data: ClassSchema) {
      //const subjectId = typeof data.id === "string" ? parseInt(data.id) : data.id;

   
 try {
     await prisma.class.update({
        where :{
           id : Number(data.id)
        },
        data 
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function DeleteClass(curruntState : {success :  boolean , error : boolean} ,data: FormData) {
    const id = data.get("id") as string
 try {
     await prisma.class.delete({
        where :{
           id :  parseInt(id)
        },
       
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}
console.log(clerkClient);


export async function  CreateTeacher(curruntState : {success :  boolean , error : boolean} ,data:  TeacherSchema) {
 try { 
   //  console.log("Clerk client keys:", Object.keys(clerkClient)); // yaha chalega
const user = await clerkClient.users.createUser({
  username: data.username,
  password: data.password,
  firstName: data.name,
  lastName: data.surname,
  publicMetadata: {
    role: "teacher",
  },
});



     await prisma.teacher.create({
        data : {
           id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        }}
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error : any) {
    console.log(error);
    console.error("Full Clerk error:", JSON.stringify(error.errors, null, 2));
     return {success : false , error : true}
 }
}

export async function UpdateTeacher(curruntState : {success :  boolean , error : boolean} ,data:  TeacherSchema) {
      //const subjectId = typeof data.id === "string" ? parseInt(data.id) : data.id;

   
 try {
  
  
   if(!data.id){
     return {success : false , error : true}
     
   }
 
   await clerkClient.users.updateUser( data.id , {
  username: data.username,
...(data.password !== "" && {password : data.password}),
  firstName: data.name,

  publicMetadata: {
    role: "teacher",
  },
});

     await prisma.teacher.update({
        
        where :{
           id :data.id
        },
         data : {
         ...(data.password !== "" && {password : data.password}),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        }}
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error : any) {
    console.log(error);
    console.error("Full Clerk error:", JSON.stringify(error.errors, null, 2));
     return {success : false , error : true}
 }
}

export async function DeleteTeahcher(curruntState : {success :  boolean , error : boolean} ,data: FormData) {
    const id = data.get("id") as string
 try { 
    await clerkClient.users.deleteUser(id)

     await prisma.teacher.delete({
        where :{
            id
        },
       
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function  CreateStudent(curruntState : {success :  boolean , error : boolean} ,data:  StudentSchema) {
 try { 

   if (!data.classId) {
  throw new Error("Class ID is required");
}
   const classItem = await prisma.class.findUnique({
      where :{
         id: data.classId
         
      },
      include :{
         _count :{
            select :{
               students : true
            }
         }
      }
   })

   if(classItem && classItem.capacity == classItem._count.students){
       return {success : false , error : true}
   }
   //  console.log("Clerk client keys:", Object.keys(clerkClient)); // yaha chalega
const user = await clerkClient.users.createUser({
  username: data.username,
  password: data.password || `Student@${Date.now()}`,
  firstName: data.name,
  lastName: data.surname,
  publicMetadata: {
    role: "student",
  },
});



     await prisma.student.create({
        data : {
           id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone  ,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId : data.gradeId,
        classId : data.classId,
        parentId : data.parentId  
      }
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error : any) {
    console.log(error);
    console.error("Full Clerk error:", JSON.stringify(error.errors, null, 2));
     return {success : false , error : true}
 }
}

export async function UpdateStudent(curruntState : {success :  boolean , error : boolean} ,data:  StudentSchema) {
      //const subjectId = typeof data.id === "string" ? parseInt(data.id) : data.id;

   
 try {
  
  
   if(!data.id){
     return {success : false , error : true}
     
   }
 
   await clerkClient.users.updateUser( data.id , {
  username: data.username,
...(data.password !== "" && {password : data.password}),
  firstName: data.name,

  publicMetadata: {
    role: "student",
  },
});

     await prisma.student.update({
        
        where :{
           id :data.id
        },
         data : {
         ...(data.password !== "" && {password : data.password}),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone ,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId : data.gradeId,
        classId : data.classId,
        parentId : data.parentId

      }
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error : any) {
    console.log(error);
    console.error("Full Clerk error:", JSON.stringify(error.errors, null, 2));
     return {success : false , error : true}
 }
}

export async function DeleteStudent(curruntState : {success :  boolean , error : boolean} ,data: FormData) {
    const id = data.get("id") as string
 try {
     
    await clerkClient.users.deleteUser(id)
     await prisma.teacher.delete({
        where :{
            id
        },
       
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function CreateExam(curruntState : {success :  boolean , error : boolean} ,data: Examschema) {
 try {
     await prisma.exam.create({
        data : {
             title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
        }
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function UpdateExam(curruntState : {success :  boolean , error : boolean} ,data: Examschema) {
      //const subjectId = typeof data.id === "string" ? parseInt(data.id) : data.id;

   
 try {
     await prisma.exam.update({
        where :{
           id : data.id
        },
        data : {
              title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
        }
     })

   //  revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}

export async function DeleteExam(curruntState : {success :  boolean , error : boolean} ,data: FormData) {
    const id = data.get("id") as string
 try {
     await prisma.subject.delete({
        where :{
           id :  parseInt(id)
        },
       
     })

    // revalidatePath("/dashboard/list/subjects")
     return {success : true , error :false}
 } catch (error) {
    console.log(error);
     return {success : false , error : true}
 }
}