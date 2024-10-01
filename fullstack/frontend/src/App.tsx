import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/Login'
import User from "./pages/User";
import Admin from "./pages/Admin";
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/user" element={<User/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
