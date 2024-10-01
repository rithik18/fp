import { useEffect } from 'react'
import { validate } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Navbar from '../components/navbar';

const Admin_add_user = () => {

    useEffect(() => {
      validate()
      console.log(Cookies.get('role') )
      if (Cookies.get('role') === "ADMIN" && Cookies.get('auth')=='true') {
       n('/add_user')
     }else if(Cookies.get('role') !== "ADMIN" && Cookies.get('auth')=='true'){
       n('/user')
     }else{
       n('/')
     }
     }, []);
   
     const n = useNavigate();
  return (
    <div>
      <Navbar/>
      <div>Admin_add_user</div>
    </div>
  )
}

export default Admin_add_user