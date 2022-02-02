import Home from "./pages/home/Home";
import CanvasPage from "./pages/canvasPage/CanvasPage";
import Profile from "./pages/Profile/Profile";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {

  

  return ( 
    <Router>
      <Routes>
        <Route path ='/' element= {<Home />} />
        <Route path ='/CanvasPage' element = {<CanvasPage />} />
        <Route path = '/Profile' element = {<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
