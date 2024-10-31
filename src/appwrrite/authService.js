import { Client, Account, ID } from "appwrite";
import envImport from "../envImport/envImport";

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(envImport.appwriteURL);
    this.client.setProject(envImport.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdAccount) {
        await this.logInAccount({ email, password });
      }
      return createdAccount;
    } catch (error) {
      console.log("appwrite error :: signup error :: " + error.message);
      return false;
    }
  }

  async logInAccount({ email, password }) {
    try {
      const loggedIn = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return loggedIn;
    } catch (error) {
      console.log("appwrite error :: login error :: " + error.message);
      return false;
    }
  }
  async getCurrentUser() {
    try {
      const getedUser = await this.account.get();
      return getedUser;
    } catch (error) {
      console.log(
        "appwrite error :: get current user error :: " + error.message
      );
      return false;
    }
  }
  async logOut() {
    try {
      const loggedOut = await this.account.deleteSessions();
      return loggedOut;
    } catch (error) {
      console.log("appwrite error :: logout error :: " + error.message);
      return false;
    }
  }
}

const auth = new Auth();

export default auth;
