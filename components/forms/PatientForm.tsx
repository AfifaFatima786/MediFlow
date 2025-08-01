

"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserFormValidation } from "@/lib/validation"

import { Button } from "@/components/ui/button"
import {
  Form,
 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patientActions"

export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'

}
 
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })
 
const PatientForm=() =>{

  const router=useRouter();

  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try{
      const userData={name: values.name, email: values.email, phone: values.phone}

      const user=await createUser(userData)

      if(user) router.push(`/patients/${user.$id}/register`)

      }
    catch(error){
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
    
    
  }


  return (
    <div className="max-h-screen overflow-auto">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) } className="space-y-5 flex-1">

        <section className="mb-10 space-y-4">
            <h1 className="header">Hi there 👋</h1>

            <p className="text-dark-700">Schedule your first appointment</p>

        </section>

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"

        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder="johndoe123@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"

        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="phone"
        label="phone number"
        placeholder="+(91) 123-5767890"
        

        />

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
    </div>
  )
}

export default PatientForm