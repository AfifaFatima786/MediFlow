

"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RegisterFormValidation } from "@/lib/validation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patientActions"
import Link from "next/link"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "@/components/ui/label"
import { SelectItem } from "@/components/ui/select";
import Image from "next/image"
import FileUploader from "../ui/FileUploader"


 
const RegisterForm=({user}:{user:User}) =>{


  const router=useRouter();

  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
      birthDate: undefined,
      gender: undefined,
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      identificationDocument: [],
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true)

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try{
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }

      }
    catch(error){
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
    
    
  }


  return (
    <div className="max-h-screen ">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) } className="space-y-12 flex-1">

        <section className="mb-10 space-y-4">
            <h1 className="header">Welcome 👋</h1>

            <p className="text-dark-700">Let us know about yourself.</p>

        </section>

        <section className="mb-10 space-y-4">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
            </div>

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

        <div className="flex gap-3 flex-col xl:flex-row">
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
        </div>


        <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.DATE_PICKER}
        name="birthDate"
        label="Date of Birth"
        placeholder="MM/DD/YYYY"
        

        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.SKELETON}
        name="gender"
        label="Gender"
        renderSkeleton={(field)=>{

          return(
            <FormControl>
                <RadioGroup 
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  
                  {GenderOptions.map((option)=>{
                    return(
                    <div key={option} className="flex items-center space-x-2">

                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {option}
                      </Label>

                    </div>
                    )
                  })}

                </RadioGroup>
            </FormControl>
          )
        }}

        />

        </div>

         {/* <section className="mb-10 space-y-4">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
            </div>

        </section> */}

        <div className="flex flex-col gap-4 xl:flex-row">

            <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="address"
        label="Address"
        placeholder="14Th Street, Bangalore"
       
        />
      
          <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="occupation"
        label="Occupation"
        placeholder="Software Engineer"
       
        />
        </div>

        <div className="flex flex-col gap-4 xl:flex-row">
           <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="emergencyContactName"
        label="Emergency contact name"
        placeholder="Guardian's name"
       
        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="emergencyContactNumber"
        label="Emergency contact number"
        placeholder="+(91) 123-5767890"
        

        />

        </div>

        <section className="mb-10 space-y-4">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
            </div>

        </section>

          <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.SELECT}
        name="primaryPhysician"
        label="Primary Physician"
        placeholder="Select a physician"
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


           <div className="flex flex-col gap-4 xl:flex-row">
           <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="insuranceProvider"
        label="Insurance provider"
        placeholder="BlueCross Blueshield"
       
        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="insurancePolicyNumber"
        label="Insurance policy number"
        placeholder="ABC123456789"
        

        />

        </div>

         <div className="flex flex-col gap-4 xl:flex-row">
           <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="allergies"
        label="Allergies (if any)"
        placeholder="Peanuts,Penicillin,Pollen"
       
        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="currentMedication"
        label="Current Medications (if any)"
        placeholder="Paracetamol 500mg"
        

        />

        </div>


         <div className="flex flex-col gap-4 xl:flex-row">
           <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="familyMedicalHistory"
        label="Family medical history"
        placeholder="Mother had brain cancer"
       
        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="pastMedicalHistory"
        label="Past medical history"
        placeholder="Appendectomy,Tonsillectomy"
       

        />

        </div>

        <section className="mb-10 space-y-4">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
            </div>

        </section>

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.SELECT}
        name="identificationType"
        label="Identification Type"
        placeholder="Select a identification"
          >
           {IdentificationTypes.map((type) => (
  <SelectItem key={type} value={type}>
    {type}
    
  </SelectItem>
))}

          </CustomFormField>

          <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="identificationNumber"
        label="Identification number"
        placeholder="123456789"
        
        />

        <CustomFormField
        
        control={form.control}
        fieldType={FormFieldType.SKELETON}
        name="identificationDocument"
        label="Scanned copy of identification document"
        renderSkeleton={(field)=>{
          return(

          <FormControl>

             <FileUploader 
              files={field.value}
              onChange={(files) => field.onChange(files)}
            /> 


          </FormControl>
          )
        }}

        />

        <section className="mb-10 space-y-4">
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
            </div>

        </section>

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="treatmentConsent"
        label="I consent to treatment"
        />
        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="disclosureConsent"
        label="I consent to disclose of information"
        />

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="privacyConsent"
        label="I consent to privacy policy"
        />





























        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>

    <div className="text-14-regular  justify-between flex w-full">
      <p className="justify-items-end text-dark-600 py-10 sm:text-left">© 2024 MediFlow </p> 

      
    </div>
    </div>
  )
}

export default RegisterForm