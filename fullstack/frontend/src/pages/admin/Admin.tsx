import { useEffect, useState } from 'react'
import { validate } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Navbar from '../../components/navbar';
const Admin = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    role_id: "",
    joining_date: "",
    department: "",
    mail: "",
    created_at: "",
    updated_at: "",
    password: "",
    profileImage: ""
  });
  const [dept, setdept] = useState(Cookies.get('department'))
  const [role, setRole] = useState(Cookies.get('role_name'))
  useEffect(() => {
    const init = async () => {
      // const token=await Cookies.get('token')
      const keysToStore = [
        "id",
        "name",
        "role_id",
        "joining_date",
        "department",
        "mail",
        "profileImage",
        "updated_at",
        "created_at",
        "password",
      ];
      var data: any = {};

      keysToStore.forEach((key) => {
        if (key == "profileImage") {
          data[key] = localStorage.getItem(key);
        } else {
          data[key] = Cookies.get(key);
        }
      });
      setUser(data);
      console.log(data.name)
      console.log(data, "data");
    };
    init();
    validate()
    console.log(Cookies.get('role') )
    if (Cookies.get('role')?.toUpperCase() === "ADMIN" && Cookies.get('auth')=='true') {
     n('/admin')
   }else if(Cookies.get('role')?.toUpperCase() !== "ADMIN" && Cookies.get('auth')=='true'){
     n('/user')
   }else{
     n('/')
   }
   }, []);
 
   const n = useNavigate();
  return (
    <div>
      <Navbar/>
      <h2 className="text-2xl font-bold mb-4">Welcome for {dept} - {role}</h2>
    </div>
  )
}

export default Admin