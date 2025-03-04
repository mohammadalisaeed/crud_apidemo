// import logo from './logo.svg';
import './App.css';
import Crud_api from './Compo/Crud_api';
import Crud_apiget from './Compo/Crud_apiget';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.js"
import Mocapi_Ass from './Compo/Mocapi_Ass';
import Login from './Compo/Login';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes> 
        <Route path='/s' element={<Crud_api/>}/>

        <Route path='/cr' element={<Crud_apiget/>}/>
        <Route path='/' element={<Login/>}/>
      
       </Routes>
       <Mocapi_Ass/>
    </div>
    // </BrowserRouter>
  );
}

export default App;
