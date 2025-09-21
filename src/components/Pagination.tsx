"use client"
import { ITEM_PER_PAGE } from '@/lib/Item_per_page'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({page , count} :{
  page : number,
  count : number
}) => {
  let rount = useRouter()
  
  const hashPrev = ITEM_PER_PAGE * (page - 1) > 0;
    const hashNext = ITEM_PER_PAGE * (page - 1)   + ITEM_PER_PAGE < count ;

  let ChangePage = (newPage : number)=> {
    const params =new URLSearchParams(window.location.search)
   params.set("page", newPage.toString())
   rount.push(`${window.location.pathname}?${params}`)

  }

  return (
    <div className=' flex items-center  justify-between text-gray-600 p-4 '>
       <button  disabled={!hashPrev} className=' py-2 px-4 bg-slate-300  rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed' onClick={()=> ChangePage(page - 1 )}>Prev</button>
       <div className='  flex justify-center items-center  gap-2 text-sm '> 
        {
          Array.from({length :Math.ceil(count/ITEM_PER_PAGE)} , (_,index)=>{
           const  pageIndex = index+1;
            return (
             <button key={pageIndex}  className={`px-2  rounded-sm ${ page === pageIndex ? " bg-lamaSky" : ""}`} onClick={()=> ChangePage(pageIndex)}  >{pageIndex}</button>
            )
          })
        }
        
        

       </div>
       <button disabled={!hashNext} className='py-2 px-4 bg-slate-300  rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed' onClick={()=> ChangePage(page +1 )}>next</button>
    </div>
  )
}

export default Pagination