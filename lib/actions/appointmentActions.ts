'use server'


import { ID, Query } from "node-appwrite"
import { file } from "zod"
import { NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID, NEXT_PUBLIC_BUCKET_ID, NEXT_PUBLIC_DATABASE_ID, databases, NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_PATIENT_COLLECTION_ID, NEXT_PUBLIC_PROJECT_ID, DATABASE_ID, APPOINTMENT_COLLECTION_ID, messaging } from "../appwriteConfig"
import { Appointment } from "@/types/appwrite.types";


import { formatDateTime, parseStringify } from "../utils"
import { revalidatePath } from "next/cache";

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



export const getRecentAppointmentList=async ()=>{
    try{
        const appointments =await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const initialCounts={
           
            scheduledCount:0,
            pendingCount:0,
            cancelledCount:0,

        }

      const counts = (appointments.documents as unknown as Appointment[]).reduce(
  (acc, appointment) => {
    if (appointment.status === 'scheduled') {
      acc.scheduledCount += 1;
    } else if (appointment.status === 'pending') {
      acc.pendingCount += 1;
    } else if (appointment.status === 'cancelled') {
      acc.cancelledCount += 1;
    }

    return acc;
  },
  initialCounts
);

    const data={
        totalCount:appointments.total,
        ...counts,
        documents:appointments.documents
    }




        return parseStringify(data)
    }
    catch(error){
        console.log(error)
    }
}



export const updateAppointment=async ({appointmentId,userId,appointment,type} : UpdateAppointmentParams)=>{
    try{
        const updatedAppointment =await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if(!updatedAppointment){
            throw new Error('Appointment not found')
        }

        console.log("appointment.schedule:", appointment.schedule);
console.log("Type of appointment.schedule:", typeof appointment.schedule);


        const smsMessage=
        `Hi, It's MediFlow.\n`+
         `${type==='schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule).dateTime} with Dr. ${appointment.primaryPhysician} `
         :  `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}`
        }`

        await sendSMSNotification(userId,smsMessage)

        revalidatePath('/admin')
        return parseStringify(updateAppointment)
    }
    catch(error){
        console.log(error)
    }
}


export const sendSMSNotification=async(userId:string,content:string)=>{
    try{
        const message=await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]

        )
        return parseStringify(message)

    }
    catch(error){
        console.log(error)
    }

}