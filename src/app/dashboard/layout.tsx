import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Suspense } from "react";

export default function dashboardtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   function MenuSkeleton() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 py-1 animate-pulse"
        >
          <div className="w-5 h-5 bg-gray-300 rounded-md" />
          <div className="hidden lg:block w-24 h-4 bg-gray-300 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between m-2">
      {/* Search Bar Skeleton */}
      <div className="hidden gap-2 items-center ring-[1.5px] ring-gray-300 rounded-full py-1 md:flex">
        <div className="mx-2 w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-[200px] h-4 bg-gray-300 rounded-md animate-pulse" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 justify-end w-full">
        {/* Message Icon */}
        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
        {/* Notification Icon */}
        <div className="relative w-8 h-8 rounded-full">
          <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
        </div>
        {/* User Info */}
        <div className="flex flex-col gap-1">
          <div className="w-20 h-3 bg-gray-300 rounded animate-pulse" />
          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* User Avatar */}
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
  
  return <div className=" h-screen flex">
     {/* left */}
    <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]    p-4">
        <Link href={"/"} className=" flex items-center justify-center gap-2 lg:justify-start">
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <span className="  hidden lg:block ">College Management</span>
        </Link>
        <Suspense fallback={<MenuSkeleton/>}><Menu/></Suspense>
        
    </div>
    {/* right */}
    <div className="w-[86%] md:w-[92%] lg;w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll flex  flex-col">
      <Suspense fallback={<NavbarSkeleton/>}> <Navbar/> </Suspense>
       
        {children}
    </div>
  </div>;
}
