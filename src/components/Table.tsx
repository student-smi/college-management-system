import React from 'react'

const Table = ({cloumn ,
    reanderRow ,
    data
} : { cloumn :{header : string; accesor : string; className : string }[];
      reanderRow :(item : any) =>React.ReactNode
      data : any[]
}    
    
) => {
  return (
    //<table className=' w-full p-4 m-2'> 
    <table className='w-full border-collapse border border-gray-200 rounded-lg'>
        <thead className=' '>
            <tr className=' bg-gray-100   text-start text-gray-700 font-semibold  '>
             {
                cloumn.map(item=>(
                    <th  key={item.accesor}  className={`${item.className} bg-gray-100   text-start text-gray-700 font-semibold `}>{ item.header  }</th>
                ))
             }
            </tr>
        </thead>
         <tbody  >
            {
                data.map(item=>(
                    reanderRow(item)
                ))
            }
         </tbody>
    </table>
  )
}

export default Table