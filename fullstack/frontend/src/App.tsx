import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/Login'
import User from "./pages/User";
import Admin from "./pages/Admin";
import Admin_add_user from "./pages/Admin_add_user";
import Admin_add_role from "./pages/Admin_add_role";
import Admin_add_skill from "./pages/Admin_add_skill";
import Admin_add_role_skill from "./pages/Admin_add_role_skill";
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/add_user" element={<Admin_add_user/>}></Route>
      <Route path="/add_role" element={<Admin_add_role/>}></Route>
      <Route path="/add_skill" element={<Admin_add_skill/>}></Route>
      <Route path="/add_role_skill" element={<Admin_add_role_skill/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
