'use client'

import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PassKeyModal from "@/components/PassKeyModal";
import { useSearchParams } from 'next/navigation';

function PassKeyWrapper() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';
  return isAdmin ? <PassKeyModal /> : null;
}


export default function Home() {

//   //const isAdmin=searchParams?.admin==='true'
// const searchParams = useSearchParams();
//   const isAdmin = searchParams.get('admin') === 'true';

  return (

  

    <div className="h-screen flex  text-white">
       <Suspense >
        <PassKeyWrapper />
      </Suspense>

      <section className="remove-scrollbar container my-auto">

        <div className="sub-container max-w-[496px]">
          <Image 
          src="/assets/icons/logo-full.jpg"
            height={40}
            width={400}
            alt="logo"
            
            className='h-12 w-[100px] mb-2'
          
          />

          <PatientForm/>

          <div className="text-14-regular mt-20 justify-between  flex w-full">
            <p className="justify-items-end text-dark-600 sm:text-left">© 2024 MediFlow </p> 

            <Link href="/?admin=true" className="text-green-500">
            Admin
            </Link>

           

          </div>
          
        </div>

      </section>

      <Image src="/assets/images/onboarding-img.png"
      alt="patient"
          height={1000}
          width={1000}
          className="side-img max-w-[50%] "/>

      
    </div>
  );
}
