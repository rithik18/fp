import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Navbar from '../components/navbar';
import { validate } from '../utils/validation';
const Admin_verify_certification = () => {
    useEffect(() => {
        validate();
        console.log(Cookies.get("role"));
        if (
          Cookies.get("role")?.toUpperCase() === "ADMIN" &&
          Cookies.get("auth") == "true"
        ) {
          n("/verify_certification");
        } else if (
          Cookies.get("role")?.toUpperCase() !== "ADMIN" &&
          Cookies.get("auth") == "true"
        ) {
          n("/user");
        } else {
          n("/");
        }
      }, []);
    
      const n = useNavigate();
  return (
<div>
    <Navbar/>
<div>Admin_verify_certification</div>
</div>
  )
}

export default Admin_verify_certification