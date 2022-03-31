import Home from "./pages/home/Home";
import CanvasPage from "./pages/canvasPage/CanvasPage";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Messages from "./pages/messages/Messages";
import Draw from "./pages/draw/Draw";


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {

  

  return ( 
    <Router>
      <Routes>
        <Route path ='/' element= {<Home />} />
        <Route path ='/CanvasPage' element = {<CanvasPage />} />
        <Route path = '/Profile' element = {<Profile/>} />
        <Route path = '/Login' element = {<Login/>} />
        <Route path = '/Register' element = {<Register/>}/>
        <Route path = '/Messages' element = {<Messages/>}/>
        <Route path = '/Draw' element = {<Draw/>}/>
       
        
        
      </Routes>
    </Router>
  );
}

export default App;
