import LoginForm from './Components/LoginForm';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './Components/Admin/AdminPage';
import SignUpForm from './Components/User/SignUpForm';
import MyBookings from './Components/User/MyBookingsPage';
import Reschedule from './Components/User/Reschedule';
import ProfilePage from './Components/User/ProfilePage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
  
    </div>
    <Routes>
    
    <Route  path="/signup" element={<SignUpForm/>} />
    <Route  path="/profile" element={<ProfilePage/>} />
    <Route path = "/reschedule" element = {<Reschedule/>}/>
    <Route  path="/Login" element={<LoginForm/>} />
    <Route path="/" element={<HomePage/>} />
    <Route path= '/mybookings' element={<MyBookings/>}/>
    <Route path="/admin" element={<AdminPage/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
