import validator from "validator";
import { profile } from './actions/user';
import { DefaultContext } from "./Context";
import { useState, useEffect } from 'react';
import { Signin } from './components/auth/signin';
import { Event } from "./components/mainpage/event";
import { Profile } from './components/auth/profile';
import { Fullform } from './components/auth/fullform';
import { Home } from './components/mainpage/home/index';
import { AdminPage } from './components/functions/admin';
import { CreateEvent } from "./components/functions/createEvent";
import { Navbar } from './components/mainpage/navbar/index';
import { Footer } from './components/mainpage/footer/index';
import { Report } from "./components/functions/report/index";
import { Registration } from './components/auth/registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getEducation } from './actions/add';
import { getAllEvents } from './actions/event';
import { Verificator } from './components/functions/verification';
import { Document } from './components/functions/documents';
import { ChangeStatus } from './components/functions/admin/ChangeStatus';
import { EventList } from "./components/functions/eventList/index";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function App() {

  let width = window.innerWidth;
  const [events, setEvents] = useState();
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(0);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(token ? true : false);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const [edu, setEdu] = useState([]);

  const handleSetIsAuth = () => {
    setIsAuth(!isAuth);
  };

  const reboot = () => {
    setEmail("");
    setPassword("");
  }

  const isValidEmail = () => {
    return validator.isEmail(email);
};
  
  useEffect(() => {
    getAllEvents().then(response => setEvents(response));
    getEducation().then(response => setEdu(response));
    profile(email, token).then(response => setUser(response));
  }, []);

    useEffect(() => {
        width = window.innerWidth;
    }, [window])

  return (
    <div className="App">
      <DefaultContext.Provider value={{ width, edu, user, edit, email, token, isAuth, events, months, current, password, reboot, setEdu, setText, setEdit, setUser, setTitle, setAlert, setEmail, setToken, setButton, setEvents, setCurrent, setPassword, isValidEmail, handleSetIsAuth }}>
        <BrowserRouter>
          <div className={`alert ${alert ? "visible" : "unvisible"}`}>
            <div className='alertBox'>
              <p className='title'>{title}</p>
              <p className='alertText'>{text}</p>
              <a className='cert btn' onClick={() => setAlert(false)}>{button}</a>
            </div>
          </div>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/event' element={<Event/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/reg' element={<Registration/>}/>
            <Route path='/fullform' element={<Fullform/>}/>
            <Route path='/verify' element={<Verificator/>}/>
            <Route path='/documents' element={<Document/>}/>
            <Route path='/eventList' element={<EventList/>}/>
            <Route path='/createEvent' element={<CreateEvent/>}/>
            <Route path='/changeStatus' element={<ChangeStatus/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </DefaultContext.Provider>
    </div>
  );
}

export default App;
