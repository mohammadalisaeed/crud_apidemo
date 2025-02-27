import React,{useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';

export default function Crud_api() {

    let [employee,setEmployee]= useState("");
    let [salary,setSalary]= useState("");
    let [email,setEmail]= useState("");
    let [password,setPassword]= useState("");
    let [designation,setDesignation]= useState("");
    let [department,setDepartment]= useState("");
    let [gender,setGender]= useState("");
    let [msg,setMsg]= useState("");
    let [isShow,setisShow]= useState("");

    async function saveinmocapi(){
        try {
            let abc = await axios.post("https://67ad88033f5a4e1477ddf5ae.mockapi.io/mocapi",{
                Employee: employee,
                Salary: salary,
                Email: email,
                Password: password,
                Designation: designation,
                Department: department,
                Gender: gender
            })
           console.log(`${abc.data}`)
           setMsg("Data Saved Succesfully")
           setisShow(true);
           clear()
        } catch (error) {
            console.log(`${error}`)
        }
    }
    function clear(){
        setEmployee("");
        setSalary("");
        setEmail("");
        setPassword("");
        setDesignation("");
        setDepartment("");
        setGender("");
    }
  return (
    <div>
        <p>Enter Employee Name</p>
        <input
        type='text'
        className='form-control my-3'
        value={employee}
        placeholder='Enter Employee Here'
        onChange={(e)=>setEmployee(e.target.value)}
        />

<p>Enter your Salary</p>
        <input
        type='text'
        className='form-control my-3'
        value={salary}
        placeholder='Enter Salary Here'
        onChange={(e)=>setSalary(e.target.value)}
        />

<p>Enter your Email</p>
        <input
        type='text'
        className='form-control my-3'
        value={email}
        placeholder='Enter Email Here'
        onChange={(e)=>setEmail(e.target.value)}
        />

<p>Enter your Password</p>
        <input
        type='text'
        className='form-control my-3'
        value={password}
        placeholder='Enter Password Here'
        onChange={(e)=>setPassword(e.target.value)}
        />

<p>Enter your Designation</p>
        <input
        type='text'
        className='form-control my-3'
        value={designation}
        placeholder='Enter Designation Here'
        onChange={(e)=>setDesignation(e.target.value)}
        />

<p>Enter your Department</p>
        <input
        type='text'
        className='form-control my-3'
        value={department}
        placeholder='Enter department Here'
        onChange={(e)=>setDepartment(e.target.value)}
        />

        <p>Select Gender</p>
        <input type='radio' name='gen' onChange={(e)=>setGender(e.target.value)} value="m" checked={gender === "m"}/>&nbsp; Male &nbsp;
        <input type='radio' name='gen' onChange={(e)=>setGender(e.target.value)} value="fm" checked={gender === "fm"}/>&nbsp; Female &nbsp;
        <input type='radio' name='gen' onChange={(e)=>setGender(e.target.value)} value="other" checked={gender === "other"}/>&nbsp; Other &nbsp;

        <br/>
        <button className='btn btn-danger my-3' onClick={saveinmocapi}>Save Data</button>
        <br/>
        <Link to="/">View Records</Link>
        { isShow &&(
            <p>{msg}</p>
        )}
    </div>
  )
}
