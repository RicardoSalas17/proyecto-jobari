import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
      errstatus:err.response.status
    };
  }

  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data
  };
}

const authorization =  {
  headers: {
    Authorization: USER_HELPERS.getUserToken(),
  }
}
// creates a basic url for every request in this file
const custumerService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/custumer`,
});


export function regisCustumer(credentials) {
  return custumerService
    .post("/new-custumer",credentials,authorization)
    .then(successStatus)
    .catch(internalServerError);
}

export function getAllClients() {
  return custumerService
    .get("/get-allcustumer",authorization)
    .then(successStatus)
    .catch(internalServerError);
}


