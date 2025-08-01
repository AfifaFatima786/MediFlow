import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home({searchParams}:SearchParamProps) {

  const isAdmin=searchParams.admin==='true'




  return (
    <div className="h-screen flex items-center justify-center text-white">
      <section className="remove-scrollbar container my-auto">

        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg"
          alt="patient"
          height={1000}
          width={1000}
          className="mb-12  w-fit"
          
          />

          <PatientForm/>

          <div className="text-14-regular mt-20 justify-between  flex w-full">
            <p className="justify-items-end text-dark-600 sm:text-left">© 2024 MediFlow </p> 

           

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
