import { ApiUrl } from "./Common";
import { TOKEN } from "./Common";
import { AsyncStorage } from 'react-native';
export class AuthenService {
  static async getAll() {
   
    
  }

  static async login(user){

    let list = undefined;
    await fetch(`${ApiUrl}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName: user.userName, password: user.password})
      })
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function(responseAsJson) {
      list = responseAsJson;
    })
    .catch(function(error) {
      console.log("Looks like there was a problem: \n", error);
    });    
    return list

  }

  static async storeToken(token) {
    try {
      await AsyncStorage.setItem(
        'token',
        TOKEN
      );
    } catch (error) {
    }
  }

  static async getToken() {
    try {
      return AsyncStorage.getItem('token');
    } catch (error) {
    }
  }

  static async clearToken() {
    try {
      return AsyncStorage.clear();
    } catch (error) {
    }
  }
  
  static async checkToken() {
    try {
      const result = await AsyncStorage.getItem('token');
      return !!result;
    } catch (error) {
    }
  }

}
