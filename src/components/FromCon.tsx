import React from 'react'
import Formdata from './Formdata';
import Table from './Table';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
 


export  type FormModel = {
  type: "create" | "update" | "delete";
  data?: any;
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  id?: number | string;
};

const FromCon =async ({
  type,
  data,
  table,
  id,
}: FormModel) => {

  let renderData = {}
    if(type !== "delete"){
        switch (table) {
            case  "subject":
                const teacherdata = await prisma.teacher.findMany({
                    select :{
                        id : true,
                        name : true,
                        surname: true
                    }
                })
               renderData = { teachers: teacherdata }

                break;
                 case  "class":
                const ClassTeacher = await prisma.teacher.findMany({
                    select :{
                        id : true,
                        name : true,
                        surname: true
                    }
                })
                 const Classgrade = await prisma.grade.findMany({
                   select:{
                     id : true , level: true
                   }
                 })
               renderData = { teachers: ClassTeacher , grade : Classgrade  }

                break;
                
                 case  "teacher":
                const teacherSubject = await prisma.subject.findMany({
                    select :{
                        id : true,
                        name : true,
                        
                    }
                })
               renderData = {subject : teacherSubject }

                break;
                   case  "student":
                const  studentGrade = await prisma.grade.findMany({
                    select :{
                        id : true,
                       level : true    
                    }
                })
                 const  studentClasses = await prisma.class.findMany({
                    include :{
                      _count :{
                        select :{
                          students : true
                        }
                      }
                    }
                })
                const StudentPArents = await prisma.parent.findMany({
                  select :{
                    id : true,
                    name : true,
                  }
                })
               renderData = { grades : studentGrade , classes : studentClasses , parent :  StudentPArents}

                break;
                      case  "exam":
                     const { sessionClaims  , userId} = await auth();
                      
                      const role = (sessionClaims?.metadata as { role?: string })?.role;
                  const examLessons = await prisma.lesson.findMany({
                     where :{
                       ...(role === "teacher" ? {teacherId : userId!} : {})
                     },
                     select :{
                      id : true,
                      name : true
                     }
                  })
                  const examClass = await prisma.class.findMany({
                    select :{
                      id: true,
                      name: true
                    }
                  })
                    
               renderData = { lessons :examLessons  , class : examClass}

                break;
                
                  case  "lesson":
                const  classlesson = await prisma.class.findMany({
                    select :{
                        id : true,
                        name : true,
                        
                    }
                })
                 const  teacherlesson = await prisma.teacher.findMany({
                    select :{
                        id : true,
                        name : true,
                        surname : true
                    }
                })
                 const  subjectLesson = await prisma.subject.findMany({
                    select :{
                        id : true,
                        name : true,
                      
                    }
                })
               renderData = {class : classlesson , teacher : teacherlesson , subject : subjectLesson}

                break;


            case "assignment":
            const lessonAssignment = await prisma.lesson.findMany({
              select :{
                id : true,
                 name : true
              }
            })
             const assignmentClass = await prisma.class.findMany({
                    select :{
                      id: true,
                      name: true
                    }
                  })
             renderData = { assignment : lessonAssignment , class : assignmentClass}
            break;
         
           case "announcement":
            const announcementclass =await prisma.class.findMany({
             select :{
              id : true,
              name : true
             }
            })
              renderData = { announcementdata : announcementclass}
           break;

           case "parent":
            const strudentParents = await prisma.student.findMany({
              select:{
                id : true,
                name : true,
                surname : true
              }
            })
             renderData = { parents : strudentParents}
              break;

              case "result":
                const examResult = await prisma.exam.findMany({
                  select :{
                    id : true,
                    title : true
                    
                  }
                })

                const tracherResult = await prisma.teacher.findMany({
                  select : {
                    id : true,
                    name : true,
                    surname: true
                  }
                })
                const classResult = await prisma.class.findMany({
                  select : {
                    id : true,
                    name : true
                  }
                })
                const studentResult = await prisma.student.findMany({
                  select :{
                    id : true,
                    name : true,
                    surname : true
                  }
                })
              
                const AssignmentResult = await prisma.assignment.findMany({
                  select:{
                    id : true,
                    title : true
                  }
                })
                
              renderData = {exam : examResult , teacher : tracherResult , classs : classResult , student : studentResult , assignment : AssignmentResult}
                break

                case "event":
                 const  classEvent = await prisma.class.findMany({
                  select :{
                     id : true,
                     name : true
                  }
                 })
                 renderData = { event : classEvent}
                 break;

                 case "attendance":
                  const lessonAttendance = await prisma.lesson.findMany({
                    select :{
                      id : true,
                      name : true,
                    }
                  })

                   const studentAttendance = await prisma.student.findMany({
                    select :{
                      id :true,
                      name : true,
                      surname : true
                    }
                   })
                   renderData = { lesson : lessonAttendance , student : studentAttendance}
            default:
                break;
        }
    }

   


  return (
    <div>
        <Formdata  type={type} table={table} id={id} data={data}    renderData={renderData}  />
    </div>
  )
}

export default FromCon