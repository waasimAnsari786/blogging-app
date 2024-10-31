import { Client, ID, Storage } from "appwrite";
import envImport from "../envImport/envImport";

class File {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(envImport.appwriteURL);
    this.client.setProject(envImport.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        envImport.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.log("appwrite error :: upload file error :: " + error.message);
      return false;
    }
  }

  getPreviewFile(fileId) {
    try {
      const getPreviewedFile = this.storage.getFilePreview(
        envImport.appwriteBucketId,
        fileId
      );
      return getPreviewedFile;
    } catch (error) {
      console.log(
        "appwrite error :: get previewd file error :: " + error.message
      );
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      const deletedFile = await this.database.updateDocument(
        envImport.appwriteBucketId,
        fileId
      );
      return deletedFile;
    } catch (error) {
      console.log("appwrite error :: update post error :: " + error.message);
      return false;
    }
  }
}

const file = new File();

export default file;
