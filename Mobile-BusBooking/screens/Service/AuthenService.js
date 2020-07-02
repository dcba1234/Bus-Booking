import { ApiUrl } from "./Common";
import { TOKEN } from "./Common";
import { AsyncStorage } from 'react-native';
export class AuthenService {
  static async getAll() {
    console.log('hello');
    let list = [];
    await this.storeToken('token');
    const token = await this.getToken();
    console.log(token);
    
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

}
