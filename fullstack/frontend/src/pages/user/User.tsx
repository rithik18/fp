import { useEffect } from 'react'
import { validate } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import UserNav from '../../components/UserNav';

const User = () => {
  useEffect(() => {
    validate()
    console.log(Cookies.get('role'),"hell")
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
      <UserNav/>
      <div>User</div>
    </div>
  )
}

export default User