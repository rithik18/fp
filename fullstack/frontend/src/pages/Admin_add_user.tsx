import { useEffect } from 'react'
import { validate } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Navbar from '../components/navbar';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"





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
      <div>
        <div className='grid grid-cols-2'>
          <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
          </div>
          <div>
            <p>123</p>
            <p>123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_add_user