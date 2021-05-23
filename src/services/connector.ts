class Connector {
  private prefix = "https://test-project-eb0e5-default-rtdb.europe-west1.firebasedatabase.app/";
  private postfix = ".json";
  constructor() {}
  fetch(url: string, options: any) {
   return fetch(this.prefix + url + this.postfix, options);
  }
}

const connector = new Connector();
export default connector
