import { Client, Account, ID } from "appwrite";
import config from "../config/config";

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

//if required same code of above can be written we are using another approach for smotther operation 


export class Authservice{
    client = new Client();
    account;



    constructor() {
        this.client
        .setEndpoint(config.APPWRITE_URL)
        .setProject(config.APPWRITE_PROJECT_ID)
        this.account = new Account(this.client);
    }
}


const authservice = new Authservice()


export default authservice;