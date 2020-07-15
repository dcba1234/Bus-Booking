import { ApiUrl } from "./Common";
import { TOKEN } from "./Common";

export class BusService {
  static async getAllBusRoute() {
    let list = [];

    //await fetch("http://192.168.0.103:9000/bus").then((i) => console.log(i));
    
    await fetch(`${ApiUrl}/route`)
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

  static async getMyRequest() {
    let list = [];

    //await fetch("http://192.168.0.103:9000/bus").then((i) => console.log(i));
    
    await fetch(`${ApiUrl}/request`,{ headers: { authtoken: TOKEN }})
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

  static async getMyBusRoute() {
    let list = [];

    //await fetch("http://192.168.0.103:9000/bus").then((i) => console.log(i));
    
    await fetch(`${ApiUrl}/route/myroute`,{ headers: { authtoken: TOKEN }})
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

}
