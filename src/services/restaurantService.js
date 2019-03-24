import http from "./storeService";
import { apiEndPoint } from "../resources/config.json";

export function getRestaurants() {
  return http.get(apiEndPoint + "/getAll");
}

export function upload() {}

export default {
  getRestaurants
};
