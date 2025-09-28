'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'



function LoginSkeleton() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-lamaSkyLight animate-pulse">
      <div className="bg-white rounded-lg drop-shadow-2xl flex flex-col gap-6 p-12 w-80">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="w-48 h-6 bg-gray-300 rounded-md" />
        </div>
        <div className="w-64 h-4 bg-gray-300 rounded-md" />
        <div className="flex flex-col gap-2">
          <div className="w-20 h-4 bg-gray-300 rounded-md" />
          <div className="w-full h-10 bg-gray-200 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-20 h-4 bg-gray-300 rounded-md" />
          <div className="w-full h-10 bg-gray-200 rounded-md" />
        </div>
        <div className="w-full h-10 bg-gray-300 rounded-md mt-2" />
      </div>
    </div>
  );
}



export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
//console.log(user);
 let router = useRouter()
 useEffect(()=>{
  if (!isLoaded) return;
 const role = user?.publicMetadata?.role ;

 if(role){
    router.push(`/dashboard/${role}`)
 }
},[user ,router , isLoaded])

  if (!isLoaded) return <LoginSkeleton />;
  return <div className=' h-screen w-screen flex justify-center items-center  bg-lamaSkyLight'>
     <SignIn.Root>
       <SignIn.Step name='start' className=' bg-white  rounded-lg  drop-shadow-2xl flex flex-col gap-3 p-12 '>
        <div className=' flex items-center gap-4 '>
          <Image src="/logo.png" alt='' height={20} width={20}/>
     <h1  className=' text-lg'>College management System</h1>

        </div>
          
           <h1 className=' text-sm text-gray-500'>Sign in to your account</h1>

   <Clerk.GlobalError className=' text-red-400'/>
   <Clerk.Field name="identifier" className=' flex flex-col gap-2'>
    <Clerk.Label className=' text-sm'>Username</Clerk.Label>
    <Clerk.Input type='text' required className=' ring-1 ring-gray-500 rounded-md focus:outline-none p-1' />

  <Clerk.FieldError className=' text-sm text-red-500'/>
      
   </Clerk.Field>
<Clerk.Field name="password" className=' flex flex-col gap-2'>
    <Clerk.Label className=' text-sm'>Password</Clerk.Label>
    <Clerk.Input type='Password' required className=' ring-1 ring-gray-500 rounded-md focus:outline-none p-1' />

  <Clerk.FieldError className=' text-sm text-red-500'/>
      
    
   </Clerk.Field>
     <SignIn.Action submit className=' py-2 px-2 bg-blue-500 rounded-md  text-white mt-2 focus:outline-none'>Submit</SignIn.Action>
       </SignIn.Step>
     </SignIn.Root>
  </div>
}