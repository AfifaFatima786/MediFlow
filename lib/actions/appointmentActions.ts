'use server'


import { ID } from "node-appwrite"
import { file } from "zod"
import { NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID, NEXT_PUBLIC_BUCKET_ID, NEXT_PUBLIC_DATABASE_ID, databases, NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_PATIENT_COLLECTION_ID, NEXT_PUBLIC_PROJECT_ID, DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "../appwriteConfig"


import { parseStringify } from "../utils"

export const createAppointment=async (appointment:CreateAppointmentParams)=>{
    try{
        const newAppointment=await databases.createDocument(NEXT_PUBLIC_DATABASE_ID!,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,ID.unique(),
        appointment
    )

        return parseStringify(newAppointment)
    }
    catch(error){
        console.log(error)
    }
}



export const getAppointment=async (appointmentId:string)=>{
    try{
        const appointment =await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)
    }
    catch(error){
        console.log(error)
    }
}