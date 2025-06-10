import Cookies from "js-cookie";
import { endpoint } from "../data";

const Logout = () => {
  Cookies.remove("authToken");
  Cookies.remove("isAdmin");
  window.location = `${endpoint}`;
  // window.location = "http://localhost:3000";
};

export default Logout;
