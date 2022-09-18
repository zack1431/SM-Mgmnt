
import {useNavigate} from 'react-router-dom'
import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from './../../App';
import axios from 'axios';

function EditMentor(props){
	let params = useParams();
	let editData = {};
	props.data.user.forEach(val=>{
		if(params.id === val.mn_id){
			editData = val;
		}
	})
  
	let [firstName,setFName] = useState(editData.firstName)
  let [lastName,setLName] = useState(editData.lastName)
  let [email,setEmail] = useState(editData.email)
  let [dob,setDOB] = useState(editData.dob)
  let [mobile,setMobile] = useState(editData.mobile)
  let navigate = useNavigate();
	const context = useContext(UserContext);

  let handleSubmit = ()=>{
	let id = params.id
    let data = {
      firstName,
      lastName,
      email,
      dob,
      mobile,
      id
    }
    let user = [...props.data.user]
    let postUrl = context.BaseUrl+"/mentor/"+params.id;
    props.data.user.forEach((val,key)=>{
		if(params.id === val.mn_id){
				user.splice(key,1,data)
			}
		})
    
    axios.put(postUrl, data)
    .then(response => props.data.setUser(user));
    
    navigate('/list-mentor')
    
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

			</form>
			<div className="p-4 row">
      	<button className="btn btn-dark mr-2" onClick={()=>navigate(`/list-mentor`)}>Back</button>
	  		<button type="submit" className="btn btn-primary ml-3 p-2"  onClick={()=>handleSubmit()}>Submit</button>
  		</div>
		</div>
	)
}

export default EditMentor;