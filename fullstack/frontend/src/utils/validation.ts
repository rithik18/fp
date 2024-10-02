import Cookies from "js-cookie";
import axios from "axios";
export const validate = async () => {
    try {
      const token = await Cookies.get("token");
      const role = await Cookies.get("role");
      var reqOptions = {};
      console.log(role)

      if (role?.toUpperCase()?.toUpperCase() === "ADMIN" ) {
        reqOptions = {
          url: "http://localhost:3000/admin",
          method: "POST",
          data: { token: token },
        };
      } else {
        reqOptions = {
          url: "http://localhost:3000/user",
          method: "POST",
          data: { token: token },
        };
      }

      const response = await axios.request(reqOptions);
      if (response.status == 403) {
        console.log("first1")
        Cookies.set("auth", "false");
      } else {
        console.log("first",response.data)
        Cookies.set("auth", response.data.auth);
      }
    } catch (e) {
console.log(e)
    }
  };