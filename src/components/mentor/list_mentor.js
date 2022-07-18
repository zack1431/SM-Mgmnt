import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import {UserContext} from './../../App'

function ListMentor(props){
	let navigate = useNavigate();

	const context = useContext(UserContext);

	

    let handleDelete = (i)=>{
        let data = [...context.user]
        data.splice(i,1)
        context.setUser(data)
        localStorage.setItem('allMentors',JSON.stringify(data))
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                      context.user.map((val,i) =>
                            <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <td>{val.firstName}</td>
                              <td>{val.lastName}</td>
                              <td>{val.email}</td>
                              <td>{val.mobile}</td>
                              <td>{val.dob}</td>
                              <td>{val.location}</td>
                              <td>
                                  <button className="btn btn-info mr-2" onClick={()=>navigate(`/edit-mentor/${i}`)}>Edit</button>
                                  <button className="btn btn-danger" onClick={()=>handleDelete(i)}>Delete</button>
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