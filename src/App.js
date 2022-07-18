// import logo from './logo.svg';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import DashBoard from './components/DashBoard';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import AddMentor from './components/mentor/add_mentor';
import EditMentor from './components/mentor/edit_mentor';
import ListMentor from './components/mentor/list_mentor';
import {useState,createContext,useEffect} from 'react'

export const UserContext = createContext()

function App() {
  let [user,setUser] = useState([
  {
      firstName:"Zakir",
      lastName:"Shaikh",
      email:"adhiban.madhav@gmail.com",
      mobile:"1234564789",
      dob:"12-09-2010",
      location:"Pune"
    },
    {
      firstName:"Virat",
      lastName:"Kohli",
      email:"srikanth.kureshi@gmail.com",
      mobile:"5689237415",
      dob:"12-09-2010",
      location:"Bangalore"
    },
    {
      firstName:"Rohit",
      lastName:"Sharma",
      email:"nelson.manikam@gmail.com",
      mobile:"4578126935",
      dob:"12-09-2005",
      location:"Hyedrabad"
    }
])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('allMentors'));
    if (items) {
     setUser(items);
    }
  }, []);
  return <>
    <div id="wrapper">
      <BrowserRouter>
        <SideBar />
        <div id="content">
          <NavBar />
          <UserContext.Provider value={{user,setUser}}>
          <Routes>
            <Route path="/" element={<DashBoard data={{user,setUser}}/>}/>
            <Route path="/adduser" element={<CreateUser data={{user,setUser}}/>}/>
            <Route path='/edit-user/:id' element = {<EditUser data={{user,setUser}}/>}/>
            
              <Route path="/add-mentor" element={<AddMentor />}/>
              <Route path='/edit-mentor/:id' element = {<EditMentor data={{user,setUser}}/>}/>
              <Route path="/list-mentor" element={<ListMentor/>}/>
            
            <Route path="*" element={<Navigate to='/'/>}/>
          </Routes>
          </UserContext.Provider>
        </div>
      
      </BrowserRouter>
    </div>
  </>
}

export default App;
