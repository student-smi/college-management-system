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
    <table className=' w-full p-4 m-2'> 
        <thead className=' w-full  '>
            <tr className=' text-start font-semibold w-full  text-gray-600  '>
             {
                cloumn.map(item=>(
                    <th  key={item.accesor}  className={item.className}>{ item.header  }</th>
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