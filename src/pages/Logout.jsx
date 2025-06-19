import Cookies from "js-cookie";

const Logout = () => {
  Cookies.remove("authToken");
  Cookies.remove("isAdmin");
  Cookies.remove("isVip");
  window.location = "http://localhost:3000";
};

export default Logout;
