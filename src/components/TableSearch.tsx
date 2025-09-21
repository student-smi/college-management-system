"use client"
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import React from 'react'

const TableSearch = () => {
  let router = useRouter()
    let ChangePage = (e:React.FocusEvent<HTMLFormElement>)=> {
    e.preventDefault()
     const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params =new URLSearchParams(window.location.search)
   params.set("search", value)
   router.push(`${window.location.pathname}?${params}`)

  }

  return (
     <form onSubmit={ChangePage} className='   w-full gap-2  items-center ring-[1.5px] ring-gray-500 rounded-full  py-1  flex  md:w-auto    '>
            <Image src="/search.png" alt='' height={15} width={15} className=' mx-2'/>
            <input type="text" className=' focus:outline-none w-[200px]'  placeholder='Search...'/>
          </form>
  )
}

export default TableSearch