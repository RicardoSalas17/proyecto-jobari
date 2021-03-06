import axios from "axios";
import * as USER_HELPERS from "../utils/userToken";

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
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
    data: res.data,
  };
}

// creates a basic url for every request in this file
const custumerService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/mp`,
});

export function regisMP(credentials) {
  return custumerService
    .post("/new-mp", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getAllMP() {
  return custumerService
    .get("/get-allmp")
    .then(successStatus)
    .catch(internalServerError);
}

