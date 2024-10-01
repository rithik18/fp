import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validate } from '../utils/validation';
const Login = () => {
  useEffect(() => {
    console.log(Cookies.get('role'),"cookei role")
    if (Cookies.get('role') === "ADMIN" && Cookies.get('auth')=='true') {
      validate()
      n('/admin')
    }else if(Cookies.get('role') !== "ADMIN" && Cookies.get('auth')=='true'){
      validate()
      n('/user')
    }else{
      n('/')
    }
  }, []);

  const n = useNavigate();
  const handleLogin = async () => {
    try {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const email = emailInput.value;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const password = passwordInput.value;
      console.log(email);
      console.log(password);
      let reqOptions = {
        url: "http://localhost:3000/role",
        method: "POST",
        data: { email: email },
      };
      let response = await axios.request(reqOptions).then(async (e) => {
        // alert(e)
        let reqOptions;
        Cookies.set("role", e.data.department);
        if (e.data.department === "ADMIN") {
          reqOptions = {
            url: "http://localhost:3000/admin",
            method: "POST",
            data: { email: email, password: password },
          };
        } else {
          reqOptions = {
            url: "http://localhost:3000/user",
            method: "POST",
            data: { email: email, password: password },
          };
        }

        return await axios.request(reqOptions);
      });
      Cookies.set("token", response.data.token);
      Cookies.set("data", response.data.data);
      Cookies.set("auth", "true");
      console.log("loggedin")
      toast.success(`Welcome ${response.data.data.name}`);
      if (Cookies.get("role") === "ADMIN") {
        console.log("admin")
        n("/admin");
      } else {
        n("/user");
      }
    } catch (e) {
      toast.error(e as String);
    }
  };
  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
