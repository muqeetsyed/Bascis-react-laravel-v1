import axios from "axios";
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Student extends Component
{
    state = {
        students: [],
        loading: true,
    }

   async componentDidMount() {
      const response  = await axios.get('http://127.0.0.1:8000/api/students');
      if(response.data.status === 200) {
         this.setState({
            students : response.data.students,
            loading: false,
         });
      }
   }


   deleteStudent = async (e, id) => {

        const clickFunda = e.currentTarget;
        clickFunda.innerText = 'Deleting...';


        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/`+id);

        if(res.data.status === 200){
            swal({
                title: "deleted ",
                text: res.data.message,
                icon: "success",
                button: "OK",
              });

            clickFunda.closest('tr').remove();
        }
   }



    
   render(){
  
    let student_html_table = '';

    if(this.state.loading){
       
       student_html_table = <tr>
        <td colSpan="6">
            <h2>loading....</h2>
        </td>
       </tr>
    }else{
        student_html_table = this.state.students.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.course}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                        <Link
                         to={`edit-student/${item.id}`}
                         className="btn btn-success btn-sm"
                        >Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }


    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Student Data
                                <Link
                                 to={'add-student'}
                                 className='btn btn-primary btn-sm float-end'
                                >
                                    Add Student
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student_html_table}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
   }
}


export default Student;
