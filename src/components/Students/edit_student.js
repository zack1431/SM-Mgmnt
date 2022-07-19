
import {useNavigate} from 'react-router-dom'
import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {UserContext} from './../../App'

function EditMentor(props){
	let params = useParams();
	const mentorContext = useContext(UserContext);	
  let [firstName,setFName] = useState(props.data.student[params.id].firstName)
  let [lastName,setLName] = useState(props.data.student[params.id].lastName)
  let [email,setEmail] = useState(props.data.student[params.id].email)
  let [dob,setDOB] = useState(props.data.student[params.id].dob)
  let [mobile,setMobile] = useState(props.data.student[params.id].mobile)
  let [location,setLocation] = useState(props.data.student[params.id].location)
  let [mentor,setMentor] = useState(props.data.student[params.id].mentor)

  let navigate = useNavigate()

  let handleSubmit = ()=>{
    let data = {
      firstName,
      lastName,
      email,
      dob,
      mobile,
      location,
      mentor
    }
    let user = [...props.data.student]

    user.splice(params.id,1,data)

    props.data.setStudent(user)
    navigate('/list-student')
    localStorage.setItem('allStudent',JSON.stringify(user))
    
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
		        <label>Select Mentor</label>
		        <select className="d-block form-control" value={mentor} onChange={(e)=>setMentor(e.target.value)}>
	            {
	            	mentorContext.user.map((val,i) =>
	            		<option key={i} value={val.firstName}>{val.firstName}</option>
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