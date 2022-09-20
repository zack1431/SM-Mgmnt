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
import AddStudent from './components/Students/add_student';
import EditStudent from './components/Students/edit_student';
import ListStudent from './components/Students/list_student';
import AssignMulti from './components/Students/assign';
import {useState,createContext,useEffect} from 'react';

import axios from 'axios';

export const UserContext = createContext()
export const StudentContext = createContext();
const BaseUrl = "https://stumentor.onrender.com";

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

  let [student,setStudent] = useState([
  {
      firstName:"vahab",
      lastName:"Shaikh",
      email:"adhiban.madhav@gmail.com",
      mobile:"1234564789",
      dob:"12-09-2010",
      location:"Pune",
      mentor:'Zakir Shaikh'
    },
    {
      firstName:"arha",
      lastName:"shaikh",
      email:"srikanth.kureshi@gmail.com",
      mobile:"5689237415",
      dob:"12-09-2010",
      location:"Bangalore",
      mentor:'Alina Shaikh'
    },
    {
      firstName:"Rohit",
      lastName:"Sharma",
      email:"nelson.manikam@gmail.com",
      mobile:"4578126935",
      dob:"12-09-2005",
      location:"Hyedrabad",
      mentor:'Zakir Shaikh'
    }
])

  useEffect(() => {
    getData();
    // const items = JSON.parse(localStorage.getItem('allMentors'));
    // if (items) {
    //  setUser(items);
    // }
    
  }, []);

  let getData = async() =>{
     let response = await axios.get(BaseUrl+'/mentor')
     let studentResponse = await axios.get(BaseUrl+'/showAll')
    let allchars = response.data;
     setUser(allchars.users)
     setStudent(studentResponse.data.data)
    //  console.log(student)
  } 
  return <>
    <div id="wrapper">
      <BrowserRouter>
        <SideBar />
        <div id="content">
          <NavBar />
          <StudentContext.Provider value={{student,setStudent,BaseUrl}}>  
          <UserContext.Provider value={{user,setUser,BaseUrl}}>
          <Routes>
            <Route path="/" element={<DashBoard data={{user,setUser}}/>}/>
            <Route path="/adduser" element={<CreateUser data={{user,setUser}}/>}/>
            <Route path='/edit-user/:id' element = {<EditUser data={{user,setUser}}/>}/>
            <Route path="/add-mentor" element={<AddMentor />}/>
            <Route path='/edit-mentor/:id' element = {<EditMentor data={{user,setUser}}/>}/>
            <Route path="/list-mentor" element={<ListMentor/>}/>
            <Route path="*" element={<Navigate to='/'/>}/>
            <Route path="/add-student" element={<AddStudent />}/>
            <Route path='/edit-student/:id' element = {<EditStudent data={{student,setStudent}}/>}/>
            <Route path="/list-student" element={<ListStudent/>}/>
            <Route path="/assign" element={<AssignMulti/>}/>
            </Routes>
          </UserContext.Provider>
          </StudentContext.Provider> 
        </div>
      
      </BrowserRouter>
    </div>
  </>
}

export default App;
