
import {useNavigate} from 'react-router-dom'
import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from './../../App'
import axios from 'axios';

function EditMentor(props){
	let params = useParams();
	const mentorContext = useContext(UserContext);	
	let editData = {};
	props.data.student.forEach(val=>{
		if(params.id === val._id){
			editData = val;
		}
	})
  let [firstName,setFName] = useState(editData.firstName)
  let [lastName,setLName] = useState(editData.lastName)
  let [email,setEmail] = useState(editData.email)
  let [dob,setDOB] = useState(editData.dob)
  let [mobile,setMobile] = useState(editData.mobile)
  let [location,setLocation] = useState(editData.location)
  let [mentor,setMentor] = useState(editData.studentDetails.firstName)
  let [mentor_id,setMentorId] = useState(null);
  let [mentorDetails,setDetails] = useState({});
  let navigate = useNavigate()



  let handleSubmit = ()=>{
	let id = params.id
    let data = {
      firstName,
      lastName,
      email,
      dob,
      mobile,
      location,
      mentor_id,
	  id,
	  _id:id,
	  studentDetails:mentorDetails
    }
    let user = [...props.data.student]
	let postUrl = mentorContext.BaseUrl+"/student/"+params.id;
    props.data.student.forEach((val,key)=>{
		if(params.id === val._id){
				user.splice(key,1,data)
			}
		})
    
    axios.put(postUrl, data)
    .then(response => props.data.setStudent(user));
    navigate('/list-student')
    
  }
  let onSelect = (e) =>{
	mentorContext.user.forEach(val =>{
		if(e.target.value === val._id){
			setDetails(val);
			setMentor(val.firstName);
			setMentorId(val._id)
		}
	})
  }
	return (
		<div className=" p-4">
			<form className="p-2 row">
			  <div className="mb-3 col-md-4">
			    <label  className="form-label">First Name</label>
			    <input type="text" className="d-block form-control" placeholder="Enter First Name" value={firstName} onChange={(e)=>setFName(e.target.value)} />
			  </div>
			  <div className="mb-3 col-md-4">
			    <label className="form-label">Last Name</label>
			    <input type="text" className="d-block form-control" placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLName(e.target.value)}/>
			  </div>
			  <div className="mb-3 col-md-4">
		        <label>Email</label>
		        <input type="email" className="d-block form-control" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>Mobile</label>
		        <input type="text" className="d-block form-control" placeholder="Enter Mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>DOB</label>
		        <input type="date" className="d-block form-control" placeholder="dd-mm-yy" value={dob} onChange={(e)=>setDOB(e.target.value)}/>
		      </div>

		      <div className="mb-3 col-md-4">
		        <label>Location</label>
		        <input type="text" className="d-block form-control" placeholder="Enter Location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
		      </div>
		      <div className="mb-3 col-md-4">
		        <label>Assigned Mentor</label>
		        <input readOnly type="text" className="d-block form-control" placeholder="Enter Location" value={mentor}/>
		      </div>
		      <div className="mb-3 col-md-4">
		        <label>Select Mentor</label>
		        <select className="d-block form-control" onChange={(e)=>onSelect(e)}>
	            {
	            	mentorContext.user.map((val,i) =>
	            		<option key={i} value={val.mn_id}>{val.firstName}</option>
            		)
	            }
	          </select>
		      </div>
			</form>
			
			<div className="p-4 row">
      	<button className="btn btn-dark mr-2" onClick={()=>navigate(`/list-student`)}>Back</button>
	  		<button type="submit" className="btn btn-primary ml-3 p-2"  onClick={()=>handleSubmit()}>Submit</button>
  		</div>
		</div>
	)
}

export default EditMentor;