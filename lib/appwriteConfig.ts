
import * as sdk from 'node-appwrite'

export const{
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_DATABASE_ID,
    NEXT_PUBLIC_PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT,


}=process.env;


export const API_KEY = process.env.NEXT_PUBLIC_API_KEY
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID
export const PATIENT_COLLECTION_ID = process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID
export const DOCTOR_COLLECTION_ID = process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID


export const APPOINTMENT_COLLECTION_ID= process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID

export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID




// Debug: Log environment variables (remove in production)

console.log('Environment variables check:', {
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
    NEXT_PUBLIC_PROJECT_ID: PROJECT_ID ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_API_KEY: API_KEY ? 'SET' : 'NOT SET'
});

// Validate required environment variables
if (!ENDPOINT) {
    throw new Error('NEXT_PUBLIC_ENDPOINT environment variable is required');
}
if (!PROJECT_ID) {
    throw new Error('PROJECT_ID environment variable is required');
}
if (!API_KEY) {
    throw new Error('API_KEY environment variable is required');
}

const client = new sdk.Client();

client
.setEndpoint(ENDPOINT)
.setProject(PROJECT_ID)
.setKey(API_KEY);

export const databases=new sdk.Databases(client);

export const storage=new sdk.Storage(client);

export const messaging=new sdk.Messaging(client);

export const users=new sdk.Users(client);


