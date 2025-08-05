import React from 'react'
import { Button } from './button'
import Image from 'next/image'
interface ButtonProps{
    isLoading:boolean,
    classname?:string,
    children:React.ReactNode,
    onClick?: () => void;
}

const SubmitButton = ({isLoading,classname,children,onClick}:ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={classname ?? 'shadow-primary-btn bg-green-700 rounded hover:bg-green-900 w-full'}
    onClick={onClick}>

        {isLoading ? (
            <div className='flex items-center gap-4'>


                <Image
                src='/assets/icons/loader.svg'
                alt="loader"
                width={24}
                height={24}
                className='animate-spin'
                />
            </div>
        ):children

        
        }


    </Button>
  )
}

export default SubmitButton