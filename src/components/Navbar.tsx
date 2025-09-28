import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'

const Navbar =async () => {
  let user = await currentUser()
    let role = user?.publicMetadata?.role as string
    console.log(user?._raw?.username);
    
  return (
    <div className='  flex items-center justify-between m-2'>
      <div className='   hidden gap-2  items-center ring-[1.5px] ring-gray-500 rounded-full  py-1   md:flex    '>
        <Image  src="/search.png" alt='' height={15} width={15} className=' mx-2'/>
        <input type="text" className=' focus:outline-none w-[200px]'  placeholder='Search...'/>
      </div>
      <div className=' flex   items-center gap-4  justify-end w-full  '>
         <div className=' rounded-full '> <Image  src="/message.png" alt='' height={20} width={20}/></div>
        <div className='  flex justify-center items-center gap-2  relative w-8 h-8 rounded-full  '>
           <Image  src="/announcement.png" alt='' width={20} height={20}/>
             <div className=' h-4 w-4  ml-4 mt-1 text-white  bg-purple-500 text-xs rounded-full text-center absolute  -top-left-2  -top-3 -top-right-2'>1</div>
        </div>
        <div className=' flex flex-col '>
           <p className=' text-xs   '>{user?._raw?.username}</p>
           <p className=' text-[12px] text-right text-gray-500 font-light'>{role}</p>
        </div>
        <UserButton  signOutUrl="/"  />
          {/* <Image src="/avatar.png" width={30} height={30} alt='' className=' rounded-full'/> */}
       
      </div>
    </div>
  )
}

export default Navbar