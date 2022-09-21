import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useContext,useEffect } from "react";
import {StudentContext} from './../../App'
import {UserContext} from './../../App'
import axios from 'axios';

function AssignMulti(props){
	const context = useContext(StudentContext);	
    const mentorContext = useContext(UserContext);	
    let [selectedMentor,setMentorValue] = useState("");
    let [nonAssigned,setnonAssigned] = useState([])
    let [nonAssignedId,setnonAssignedID] = useState([])
    let navigate = useNavigate()
  useEffect(() => {
    getStudentData().then(val =>{
        
    })
    
  });
    let getStudentData = async () =>{
        let response = await axios.get(context.BaseUrl+'/nonAssignedStd')
        setnonAssigned(response.data.users)
    }
    var data = []
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
              {
                nonAssigned.map((val,i) =>
                    <div className="mb-3 col-md-4" key={i}>
                        <input type="checkbox" onChange={(e)=>handleCheck(e,val)}/>
                        <label  className="form-label">{val.firstName} {val.lastName}</label>
                    </div>
                )
              }
			  
			</form>
			<div className="p-4 row">
      	<button className="btn btn-dark mr-2" onClick={()=>navigate(`/list-student`)}>Back</button>
	  		<button type="submit" className="btn btn-primary ml-3 p-2"  onClick={()=>handleSubmit()}>Submit</button>
  		</div>
		</div>
	)
}

export default AssignMulti;