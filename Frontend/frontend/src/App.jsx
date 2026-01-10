
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './component/Signup'
import Home from './component/Home'
import Login from './component/Login'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
   </Routes>
   <ToastContainer></ToastContainer>
   </BrowserRouter>
  )
}

export default App
