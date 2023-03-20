import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';


function EditStudent() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://127.0.0.1:8000/api/edit-student/`+id);
            if(response.data.status === 200) {
                setName(response.data.student.name);
                setCourse(response.data.student.course);
                setEmail(response.data.student.email);
                setPhone(response.data.student.phone);
            }
        }

        fetchData();
       
    },[]);


    function handleInput(e) {
        e.preventDefault();

        if(e.target.name === 'course'){
            setCourse(e.target.value);
        }
        if(e.target.name === 'name')
        {
            setName(e.target.value);
        }
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }
        if(e.target.name === 'phone'){
            setPhone(e.target.value);
        }
    }


    async function updateStudent(e) {
        e.preventDefault();


        document.getElementById('updatebtn').innerText = 'updating'; 
        document.getElementById('updatebtn').disabled = true; 

        const data = {
            name: name,
            course: course,
            email: email,
            phone: phone,
        };
      

        const response =  await axios.put("http://127.0.0.1:8000/api/update-student/"+id, data);

        if(response.data.status === 200){
            swal({
                title: "update ",
                text: response.data.message,
                icon: "success",
                button: "OK",
              });
            document.getElementById('updatebtn').innerText = 'update Student'; 
            document.getElementById('updatebtn').disabled = false; 
        }

    }
  
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <h4> 
                            Edit Student
                            <Link
                                to={'/'}
                                className='btn btn-primary btn-sm float-end'
                            >
                                Back
                            </Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateStudent}>
                            <div className="form-group mb-3">
                                <label>Student Name</label>
                                <input type="text" name="name" onChange={handleInput} value={name} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Course</label>
                                <input type="text" name="course" onChange={handleInput} value={course} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Email</label>
                                <input type="text" name="email" onChange={handleInput} value={email} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Phone</label>
                                <input type="text" name="phone" onChange={handleInput} value={phone} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" id="updatebtn" className="btn btn-primary">Update Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  }

export default EditStudent;
