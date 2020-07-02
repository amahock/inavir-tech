// const serverUrl = "http://localhost:4000";

const networkRequests = (endPoint,method="GET",data = {}) =>
  new Promise((resolve,reject)=>{

    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("jwtToken")
    });

    const config = {
      method,
      mode: "cors",
      headers
    };
    if (method !== "GET") {
      // console.log(data);
      config.body = JSON.stringify(data);
      // console.log(config.body);
    }
    fetch(`${endPoint}`, config)
      .then(response => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        } else {
          // console.log(serverUrl);
          // console.log(endPoint);
          // console.log(response);
          // console.log("response from server" + response);
          return response.json();
          // throw Error("network request failed!!");
        }
      })
      .then(result => {
        // console.log("result from server"+result.data);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });

  export default networkRequests;