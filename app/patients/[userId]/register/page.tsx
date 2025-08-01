import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patientActions'

const Register =async ({params}:SearchParamProps) => {
  console.log(params)

    const {userId}=await params;
    console.log(userId+"user ")

    const user=await getUser(userId)

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <section className="remove-scrollbar container max-w-[860px] overflow-auto max-h-screen">

        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg"
          alt="patient"
          height={1000}
          width={1000}
          className="mb-12  w-fit"
          
          />

          <RegisterForm user={user}/>
        </div>

      </section>

      <Image src="/assets/images/register-img.png"
      alt="patient"
          height={1000}
          width={1000}
          className="side-img max-w-[390px] "/>

      
    </div>
  )
}

export default Register