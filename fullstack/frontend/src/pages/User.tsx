import { useEffect } from 'react'
import { validate } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const User = () => {
  useEffect(() => {
    validate()
    console.log(Cookies.get('role') )
    if (Cookies.get('role') === "ADMIN" && Cookies.get('auth')=='true') {
     n('/admin')
   }else if(Cookies.get('role') !== "ADMIN" && Cookies.get('auth')=='true'){
     n('/user')
   }else{
     n('/')
   }
   }, []);
 
   const n = useNavigate();
  return (
    <div>User</div>
  )
}

export default User