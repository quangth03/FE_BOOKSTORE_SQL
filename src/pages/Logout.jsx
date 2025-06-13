import Cookies from "js-cookie";
import { endpoint } from "../data";

const Logout = () => {
  Cookies.remove("authToken");
  Cookies.remove("isAdmin");
  Cookies.remove("isVip");
  window.location = "https://fe-bookstore-sql.vercel.app";
  // window.location = "http://localhost:3000";
};

export default Logout;
