import NavBar from "./Navbar";
import SignUp from './Signup';
import LogIn from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div>
    <NavBar/>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />


    </Routes>
    </div>

    </Router>
    
  );
}

export default App;
