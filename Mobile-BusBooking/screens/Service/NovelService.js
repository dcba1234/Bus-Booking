export class NovelService {
  static async getAll() {
    console.log('hello');
    let list = [];

    //await fetch("http://192.168.0.103:9000/bus").then((i) => console.log(i));
    
    await fetch("http://192.168.0.103:9000/bus")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(responseAsJson) {
        console.log(responseAsJson);
        
      })
      .catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });    


    await fetch("https://tienthanh217.000webhostapp.com/Api/getListNovel.php")
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

      console.log('hello');
      
      return list
  }

  static async getAllChap() {
    let list = [];
    await fetch("https://tienthanh217.000webhostapp.com/Api/getChap.php")
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
  static async getAllType() {
    let list = [];
    await fetch("https://tienthanh217.000webhostapp.com/Api/getType.php")
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
