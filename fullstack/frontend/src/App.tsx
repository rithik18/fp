import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/Login'
import User from "./pages/User";
import Admin from "./pages/Admin";
import Admin_add_user from "./pages/Admin_add_user";
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/add_user" element={<Admin_add_user/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
