import { Client, Databases,Storage,Query, ID } from "appwrite";
import config from "../config/config";


export class Service{
    client = new Client();;
    databases;
    bucket;


    constructor(){
        this.client
        .setEndpoint(config.APPWRITE_URL)
        .setProject(config.APPWRITE_PROJECT_ID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //methods 
    async createPost({tittle,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                 config.APPWRITE_DATABASE_ID,
                 config.APPWRITE_COLLECTION_ID,
                 slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId 
                }
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }

    async updatePost(slug,{tittle,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }


    //here slug is like unique Id which will be handled later
    //concentrate on on the return button ,coz the smae thing needs to be handkled in teh frontend
    async DeletePost(slug){
        try {
          return await this.databases.deleteDocument(
              config.APPWRITE_DATABASE_ID,
              config.APPWRITE_COLLECTION_ID,
              slug
          );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                slug
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }

    async getPosts(queries=[Query.equal("status","Active")]){
        //here to give status u need to enable indexes in teh databse designing part
        try {
            return await this.databases.listDocuments(
                config.APPWRITE_DATABASE_ID,
                config.APPWRITE_COLLECTION_ID,
                queries
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }

    //file service
    //this will deal with storage
    //this will return string of uploaded file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }



    //deletefile
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.APPWRITE_BUCKET_ID,
                fileId
            );
        } catch (error) {
            throw new Error("Appwrite service error: " + error);
        }
    }
}

const service = new Service();
export default service