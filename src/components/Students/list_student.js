import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import {StudentContext} from './../../App';
import axios from 'axios';

function ListMentor(props){
	let navigate = useNavigate();

	const context = useContext(StudentContext);

	

    let handleDelete = (i,id)=>{
        let data = [...context.student]
        data.splice(i,1)
        context.setStudent(data)
        let deleteUrl = context.BaseUrl+"/student/"+id
        axios.delete(deleteUrl)
    }

    
	return(
		<div className="p-2">
			<table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>DOB</th>
                  <th>Location</th>
                  <th>Mentor</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                      context.student.map((val,i) =>
                            <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <td>{val.firstName}</td>
                              <td>{val.lastName}</td>
                              <td>{val.email}</td>
                              <td>{val.mobile}</td>
                              <td>{val.dob}</td>
                              <td>{val.location}</td>
                              <td>{val.studentDetails.firstName} {val.studentDetails.lastName}</td>
                              <td>
                                  <button className="btn btn-info mr-2" onClick={()=>navigate(`/edit-student/${val._id}`)}>Edit</button>
                                  <button className="btn btn-danger" onClick={()=>handleDelete(i,val._id)}>Delete</button>
                              </td>
                            </tr>
                      )
                  }
                
              </tbody>
            </table>
		</div>
	)
}

export default ListMentor;