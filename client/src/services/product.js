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

const authorization =  {
  headers: {
    Authorization: USER_HELPERS.getUserToken(),
  }}
// creates a basic url for every request in this file
const productService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/product`,
});

export function regisProduct(credentials) {
  return productService
    .post("/new-product", credentials)
    .then(successStatus)
    .catch(internalServerError);
}
export function getAllProducts() {
  return productService
    .get("/get-products",authorization)
    .then(successStatus)
    .catch(internalServerError);
}

export function getProduct(id) {
  return productService
    .get(`/product-detail/${id}`)
    .then(successStatus)
    .catch(internalServerError);
}