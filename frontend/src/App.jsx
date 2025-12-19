import React from "react";
import AppNavbar from "./components/Navbar/AppNavbar";
import Home from "./components/Home/Home.jsx";
import RegisterForm from "./components/forms/registerform.jsx";
import Signup from "./components/forms/signup";
import Bottom from "./components/Home/bottom.jsx";
import Footer  from "./components/footer/footer.jsx";
import Services from './components/Services/Services';
import Read from './components/pages/Read';
import About from './components/About/About';
import PaymentForm from './components/Price/Price';
import LoggedHome from './components/Logged/loggedHome';

function App() {
  return (
    <div>
      <AppNavbar />
      <LoggedHome/>
  
   
    </div>
  );
}

export default App;
