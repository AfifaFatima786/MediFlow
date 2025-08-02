

"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getAppointmentSchema } from "@/lib/validation"

import { Button } from "@/components/ui/button"
import {
  Form,
 
} from "@/components/ui/form"
import { updateAppointment } from "@/lib/actions/appointmentActions"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/CustomFormField"
import Image from "next/image"
import SubmitButton from "../ui/SubmitButton"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patientActions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "@/components/ui/select"
import { createAppointment } from "@/lib/actions/appointmentActions"
import { Appointment } from "@/types/appwrite.types"
import { scheduler } from "timers/promises"

 
const AppointmentForm=({
    userId,patientId,type,appointment,setOpen
}:{
    userId:string;
    patientId:string,
    type:"create" | "cancel" | "schedule",
    appointment?: Appointment,
    setOpen:(open:boolean)=>void;
}) =>{

  const router=useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormValidation=getAppointmentSchema(type)

  console.log(appointment)
  
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:appointment ? appointment.primaryPhysician : '',
      schedule:appointment  ? new Date(appointment?.schedule): new Date(Date.now()),
      reason:appointment ? appointment.reason : "",
      note:appointment ? appointment.note : "",
      cancellationReason:appointment?.cancellationReason || ""
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>)  {

    console.log("submitting",{type})
    setIsLoading(true)

    let status;
    switch (type) {
        case 'schedule':
            status='scheduled'
            
            break;
        case 'cancel':
            status='cancelled'
            
            break;
    
        default:
            status='pending'
            
            break;
    }

    try{

      if(type==="create" && patientId){
        const appointmentData={
            userId,
            patient:patientId,
            primaryPhysician:values.primaryPhysician,
            schedule:new Date(values.schedule),
            reason:values.reason!,
            note:values.note,
            status: status as Status

        }
        const appointment=await createAppointment(appointmentData)
        if(appointment){
          form.reset({
  primaryPhysician: "",
  schedule: new Date(),
  reason: "",
  note: "",
  cancellationReason: "",
})

    console.log("Push hojaa dost", appointment)
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }else{
              console.log("Push hojaa dost else case", appointment)

        }
      }
      else{
        const appointmentToUpdate={
          userId,
          appointmentId:appointment.$id!,
          appointment:{
            primaryPhysician:values?.primaryPhysician,
            schedule:new Date(values?.schedule),
            status:status as Status,
            cancellationReason:values?.cancellationReason
          },
          type,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
        const updatedAppointment= await updateAppointment(appointmentToUpdate)

        if(updatedAppointment){
          
          form.reset()
          setOpen(false)
        }

        
  //setIsLoading(false)
  setOpen(false) 


      }

      }
    catch(error){
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
    
    
  }

  const [buttonLabel, setButtonLabel] = useState("Create Appointment")

  useEffect(() => {
  if (type === "cancel") setButtonLabel("Cancel appointment");
  else if (type === "schedule") setButtonLabel("Schedule appointment");
  else setButtonLabel("Create Appointment");
}, [type]);

  return (
    <div className="  overflow-auto">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) } className="space-y-5 flex-1">

        {type==='create' && <section className="mb-10 space-y-4">
            <h1 className="header">New Appointment</h1>

            <p className="text-dark-700">Request a new appointment in 10 seconds</p>

        </section>}

        {type!=="cancel" && (
            <>

            <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.SELECT}
        name="primaryPhysician"
        label="Doctor"
        placeholder="Select a doctor"
          >
           {Doctors.map((doctor) => (
  <SelectItem key={doctor.name} value={doctor.name}>
    <div className="flex cursor-pointer items-center gap-2">
      <Image
        src={doctor.image}
        width={32}
        height={32}
        alt={doctor.name}
        className="rounded-full border-dark-500"
      />
      
      <p>{doctor.name}</p>
    </div>
  </SelectItem>
))}

</CustomFormField>



          <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect dateFormat="MM/dd/yyyy - h:mm aa"

          >
            
          </CustomFormField>

          <div className="flex flex-col gap-6 ">
            <CustomFormField
              control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="reason"
        label="Reason for appointment"
        placeholder="Enter reason for appointment"
          >

            </CustomFormField>

            <CustomFormField
              control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="note"
        label="Notes"
        placeholder="Enter notes"
          >

            </CustomFormField>

          </div>


            </>
        )}


        {type==="cancel" && (
             <CustomFormField
              control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="cancellationReason"
        label="Reason for cancellation"
        placeholder="Enter reason for cancellation"
          >

            </CustomFormField>

        )}

        
        
        <SubmitButton isLoading={isLoading} classname=  {type==="cancel" ? 'shad-danger-btn  w-full rounded mt-2' : 'shad-primary-btn w-full rounded mt-2'}
        >
         {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
    </div>
  )
}

export default AppointmentForm