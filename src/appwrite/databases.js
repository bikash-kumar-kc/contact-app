import config from "../../config/config";
import { Client, ID, Databases,Storage } from "appwrite";

export class Services {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);

  }

  // creating document

  async createContact({ Name, Email, userid }) {
    try {
      console.log(Name, Email, userid);

      return await this.database.createDocument(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        userid,
        {
          Name,
          Email,
         userid,
        }
      );
    } catch (error) {
      console.log("problem in creating post: " + error);
    }}

    // delete contact......

    async deleteContactapp(documentid){

        try{

            return await this.database.deleteDocument(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                documentid,

            )
        }catch(error){

        }
    }


    // getallcontacts.......

    async getallcontacts(documentid){

        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseid,
                config.appwriteCollectionid,
                documentid,
            )
        } catch (error) {
            console.log("problem in getting all posts"+error)
        }
    }

    // updatecontact..........
    async editcontactapp({documentid,upname,upemail}){

      try{

        return await this.database.updateDocument(
           config.appwriteDatabaseid,
                config.appwriteCollectionid,
                documentid,{
                  Name:upname,
                  Email:upemail,
                }
        )
      }catch(error){
        console.log("error in updating contact"+ error);
      }
    }


    // uploading images........
    async uploadimage(fileinput,imageid){
      try{
        return await this.storage.createFile(
          config.appwriteBucketid,
          imageid,
          fileinput,
        )
      }catch(error){
        console.log("error from uploading image: "+ error)
      }
    }

    // deleting image........
    async deleteimage(imageid){
      try {
        return await this.storage.deleteFile(
          config.appwriteBucketid,
          imageid,
        )

      } catch (error) {
        console.log("problem in deleting images"+ error)
      }
    }

    // to get all images.......

    async getallimages(){
      try {
        return await this.storage.listFiles(config.appwriteBucketid);
      } catch (error) {
        console.log("error from getting all images. "+ error);
      }
    }


    // to get preview of images........

    // async getfilepreview(fileId){

    //   try {
    //     return await this.storage.getFileView(
    //       config.appwriteBucketid,
    //       fileId,
    //     )
    //   } catch (error) {
    //     console.log("error from image preview"+error);
    //   }
    // }

  }


const services = new Services();
export default services;
