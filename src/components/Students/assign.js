import './student.css'
import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useContext } from "react";
import {StudentContext} from './../../App'
import {UserContext} from './../../App'
import axios from 'axios';
// import Dropdown from './dropdown'


function AssignMulti(){
	const context = useContext(StudentContext);	
    const mentorContext = useContext(UserContext);	
    let [selectedMentor,setMentorValue] = useState("");
    let [nonAssignedId,setnonAssignedID] = useState([]);
    let [dropdown,setDropdown] = useState(false)
    let navigate = useNavigate()
 
  let handleSubmit = async ()=>{
    if(nonAssignedId.length > 0 && selectedMentor !== ''){
        
        let reqObj = {
            temp : JSON.stringify(nonAssignedId),
        }
        let url = context.BaseUrl+'/assignMulti/'+selectedMentor;
        let response = await axios.post(url,reqObj)
        console.log(response)
        let studentResponse = await axios.get(context.BaseUrl+'/showAll')
        context.setStudent(studentResponse.data.data)
        let response2 = await axios.get(context.BaseUrl+'/nonAssignedStd')
        context.setnonAssigned(response2.data.users)
        navigate('/list-student')
    }
    else{
        if(selectedMentor === ''){
            alert('Select mentor to assign')
        }
        else{
            alert('Add student to assign')
        }
    }
  }

//   on select change
let handleChange = (e) => {
    setMentorValue(e.target.value);
  }
  let toggleDropDown = ()=>{
    setDropdown(prev => !prev);
  }
  var data = [];
  let handleCheck = (e,val) => {
    if(e.target.checked){
        data.push(val._id);
    }
    else{
        if(data.length > 1){
            data = data.filter(rec => rec !== val._id )
        }
        else
        {
            data.splice(0,1);
        }
    }
    setnonAssignedID(data);
  }
  
	return (
		<div className=" p-4">
			<form className="p-2 row">
		      <div className="mb-3 col-md-4">
		        <label>Select Mentor</label>
		        <select className="d-block form-control" onChange={(e) => handleChange(e)}>
	            {
	            	mentorContext.user.map((val,i) =>
	            		<option key={i} value={val.mn_id}>{val.firstName}</option>
            		)
	            }
	          </select>
		      </div>
          <div className='col-md-4'>
          <div className='formField' onClick={()=>toggleDropDown()}>
            <label>Select Multiple Students</label>
            
            
        </div>
        
        <div className='RevRequestedTooltip' hidden={!dropdown}>
                <div className='tooltip-body'>
                    {
                      context.nonAssigned.map((val,i) =>
                        <div key={i}>
                          <input type="checkbox" onChange={(e)=>handleCheck(e,val)}/>
                          <label  className="form-label">{val.firstName} {val.lastName}</label>
                        </div>
                      )
                    }
                </div>
            </div>
          </div>
			</form>
			<div className="p-4 row">
      	<button className="btn btn-dark mr-2" onClick={()=>navigate(`/list-student`)}>Back</button>
	  		<button type="submit" className="btn btn-primary ml-3 p-2"  onClick={()=>handleSubmit()}>Submit</button>
  		</div>
		</div>
	)
}

export default AssignMulti;