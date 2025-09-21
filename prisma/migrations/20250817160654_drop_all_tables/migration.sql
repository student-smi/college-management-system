/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropTable
DROP TABLE "public"."Attendance";

-- DropTable
DROP TABLE "public"."Student";

-- DropTable
DROP TABLE "public"."Teacher";
