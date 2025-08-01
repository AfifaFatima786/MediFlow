import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patientActions";

export default async function NewAppointment({params}:SearchParamProps) {
    //console.log(userId)

    const {userId}= await params;

    const patient=await getPatient(userId);
    console.log(patient)
  return (
    <div className="h-screen flex items-center justify-center text-white  ">
      <section className="remove-scrollbar container my-auto">

        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image src="/assets/icons/logo-full.svg"
          alt="patient"
          height={1000}
          width={1000}
          className="mb-12  w-fit"
          
          />

          <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient.$id}

          
          />
            <p className="justify-items-end text-dark-600 sm:text-left py-10">© 2024 MediFlow </p> 

           

          
          
        </div>

      </section>

      <Image src="/assets/images/appointment-img.png"
      alt="patient"
          height={1000}
          width={1000}
          className="side-img max-w-[30%] bg-bottom "/>

      
    </div>
  );
}
