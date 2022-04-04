const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = // put in movies API url
    }
  }
  
  module.exports = LaunchAPI;