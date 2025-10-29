import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );

//if required same code of above can be written we are using another approach for smoother operation

//we are taking class syntax so that we remove the concept of vendor lock-in 
//after this we can easily switch to firebase ,supabase (backend services)

export class Authservice{
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.APPWRITE_URL)
        .setProject(config.APPWRITE_PROJECT_ID)
        this.account = new Account(this.client);
    }


    //now creating the methods inside the Authservice class so that if changes are required in the future, we can easily manage them

    //user will pass a object of email,passowrd,name thats y we destrcuturing it here
    async createAccount({email,password,name}){
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );


            if(!user){
                //or you can call another  method //login method 
                return this.Login({email,password})
            }else{
                return user
            }
            
        } catch (error) {
            throw error;
        }
    }

    //
    async Login({email,password}){
        //safe to wrap in it try catch 
        try {
            const loggedInUser =this.account.createEmailPasswordSession(
                email,
                password
            )


            if(!loggedInUser){
                return "user not found"
            }else{
                return loggedInUser
            }
        } catch (error) {
            throw error
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrtite service :: getcurrentuser error",error)
        }
        return null;
    }


    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite error :: Logout error",error)
        }
    }

    
}


const authservice = new Authservice()


export default authservice;