import { Client, Users, ID } from 'node-appwrite';


export const API_KEY = process.env.NEXT_PUBLIC_API_KEY
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID
export const PATIENT_COLLECTION_ID = process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID
export const DOCTOR_COLLECTION_ID = process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID


const client = new Client()
  .setEndpoint(ENDPOINT)
.setProject(PROJECT_ID)
.setKey(API_KEY);

const users = new Users(client);

async function createTestUser() {
  try {
    const newUser = await users.create(
      ID.unique(),
      "afifarizvi20@gmail.com",
      "+916307733533",
      "TempPassword@123",
      "Afifa Khan"
    );
    console.log("✅ User ban gaya:", newUser);
  } catch (error) {
    console.error("❌ Error aaya:", error.code, error.message);
    console.log("Full error:", error);
  }
}

createTestUser();
