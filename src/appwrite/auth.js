import { Client, Account, ID } from 'appwrite'
import conf from '../conf/conf'

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  // creating the signup functionality

  async createAccount({ email, password, name }) {
    
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
          return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
      throw error
    }
    }

    // creating the login functionality
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
            
        } catch (error) {
            console.log(error);
            throw error;


            
        }
    }
    // getting the current user if still logged in visits
    async getCurrentUser() {
         try {
             return await this.account.get();
             
         } catch (error) {
             console.log(error);
             throw error;


            
        }
    }
    

    // create logout functionality
    async logout() {
        try {
            return await this.account.deleteSessions();

            
        } catch (error) {
            console.log(error);
            throw error;

        }
    }

}

const authService = new AuthService()
export default authService
