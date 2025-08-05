"use server"

import { ID, Query } from "appwrite"
import { NEXT_PUBLIC_BUCKET_ID, NEXT_PUBLIC_DATABASE_ID, databases, NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_PATIENT_COLLECTION_ID, NEXT_PUBLIC_PROJECT_ID, storage, users } from "../appwriteConfig"
import { parseStringify } from "../utils"
import {InputFile} from 'node-appwrite/file'

export const createUser=async (user:CreateUserParams )=>{
    try{
        console.log("suer y h")
        console.log(user)

        const newUser=await users.create(ID.unique(),user.email,user.phone,"TempPassword@123",user.name)
        console.log("new user")
        console.log({newUser})
        return newUser

    }
    catch(error : any){
         
      if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
    
}

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     console.log("Creating user:", user);

//     const newUser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       user.name
//     );

//     console.log("✅ New user created:", newUser);
//     return newUser;

//   } catch (error: any) {
//     if (error?.code === 409) {
//       console.warn("⚠️ User already exists, checking for fallback...");

//       // ⚠ Appwrite users.list() doesn't support Query.equal("email") reliably
//       // So we return null or a fake object instead of crashing
//       return {
//         $id: null,
//         email: user.email,
//         message: "User already exists, but exact match could not be fetched.",
//         status: "exists",
//       };
//     }

//     console.error("❌ Unexpected error during user creation:", error);
//     throw error;
//   }
// };





export const getUser=async (userId:string )=>{
    try{
        console.log(userId)
        const user=await users.get(userId)
        console.log(user)
        
        return parseStringify(user)

    }
    catch(error ){
        console.log(error)
        
    }
}

export const getPatient=async (userId:string )=>{
    try{
        
        const patients=await databases.listDocuments(
            NEXT_PUBLIC_DATABASE_ID!,
            NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
            [Query.equal('userId',userId)]
        )
        
        
        return parseStringify(patients.documents[0])

    }
    catch(error ){
        console.log(error)
        
    }
}


export const registerPatient=async ({identificationDocument,...patient}:RegisterUserParams)=>{
    try{
        let file;
        if(identificationDocument){
            const inputFile=InputFile.fromBuffer(
                identificationDocument?.get('blobfile') as Blob,
                identificationDocument?.get('fileName') as string
            )

            file=await storage.createFile(NEXT_PUBLIC_BUCKET_ID!,ID.unique(),inputFile)}

        

            const newPatient=await databases.createDocument(NEXT_PUBLIC_DATABASE_ID!,NEXT_PUBLIC_PATIENT_COLLECTION_ID!,ID.unique(),{
                identificationDocumentId:file?.$id || null,
                identificationDocumentUrl:`${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`,...patient
            })
        

        return parseStringify(newPatient);

        

    }
    catch(error ){
        console.log(error)
        
    }
}

