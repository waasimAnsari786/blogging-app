import { Client, Databases, ID, Query } from "appwrite";
import envImport from "../envImport/envImport";

class Post {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(envImport.appwriteURL);
    this.client.setProject(envImport.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost(post) {
    try {
      const createdPost = await this.database.createDocument(
        envImport.appwriteDatabaseId,
        envImport.appwriteCollectionId,
        post.slug,
        { ...post }
      );
      return createdPost;
    } catch (error) {
      console.log("appwrite error :: create post error :: " + error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const getedPost = await this.database.getDocument(
        envImport.appwriteDatabaseId,
        envImport.appwriteCollectionId,
        slug
      );
      return getedPost;
    } catch (error) {
      console.log("appwrite error :: get post error :: " + error.message);
      return false;
    }
  }

  async updatePost(post) {
    try {
      const updatedPost = await this.database.updateDocument(
        envImport.appwriteDatabaseId,
        envImport.appwriteCollectionId,
        post.slug,
        { ...post }
      );
      return updatedPost;
    } catch (error) {
      console.log("appwrite error :: update post error :: " + error.message);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      const deletedPost = await this.account.deleteSessions(
        envImport.appwriteDatabaseId,
        envImport.appwriteCollectionId,
        slug
      );
      return deletedPost;
    } catch (error) {
      console.log("appwrite error :: delete post error :: " + error.message);
      return false;
    }
  }
  async getPosts(queries = [Query.notEqual("status", ["inactive"])]) {
    try {
      const getedPosts = await this.account.deleteSessions(
        envImport.appwriteDatabaseId,
        envImport.appwriteCollectionId,
        queries
      );
      return getedPosts;
    } catch (error) {
      console.log("appwrite error :: get posts error :: " + error.message);
      return false;
    }
  }
}

const post = new Post();

export default post;
