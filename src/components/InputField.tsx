import React from 'react'
import { FieldError } from 'react-hook-form';

const InputField = ({label , type ="text" , register , error , name , inputProps , defaultValue} :
    {
        label : string;
        type?: string;
        register : any;
        error?: FieldError ;
        name : string;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>; 
         defaultValue?: string;
    } 
) => {
  return (
    <div className=' flex flex-col gap-5 w-full md:w-1/4'>
        <label className=' text-xs text-gray-500 '>{label}</label>
         <input type={type} {...register(name)} className=' w-full text-sm rounded-md p-2 ring-1 ring-gray-400 focus:outline-none'  {...inputProps}
         defaultValue={defaultValue}/>
         {error?.message && <p className=' text-xs text-red-500 '>{error.message.toString()}</p>}
    </div>
  )
}

export default InputField