import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function Crud_apiget() {
    let [record, setRecord] = useState([]);
    let [search, setSearch] = useState("");
    let [sort, setSort] = useState("");
    let [msg, setMsg] = useState("");
    let [isshow, setIsShow] = useState(false);

    //1. txtbox state
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [gender, setGender] = useState("");
    let [pswd, setPswd] = useState("");
    let [id, setId] = useState(null);
    let [age, setAge] = useState(0);
    let Loc = useLocation()
    let user_name = Loc.state?.n;

    let mock_url = "https://67ad88033f5a4e1477ddf5ae.mockapi.io/mocapi";

    //2. Fetch Record function
    function fetch_Record(a, b, c, d, e, f) {
        setName(a);
        setEmail(b);
        setPswd(c);
        setGender(d);
        setAge(e);
        setId(f);
    }

    //3. Retry Logic for API Requests
    const fetchData = async (retries = 3) => {
        try {
            const response = await axios.get(mock_url);
            setRecord(response.data);
        } catch (error) {
            if (error.response && error.response.status === 429 && retries > 0) {
                // Wait for a while before retrying
                console.log("Rate limit reached. Retrying...");
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
                fetchData(retries - 1); // Retry
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //4. Delete Record function
    function DeleteRecord(id, Employee) {
        if (window.confirm(`Are you sure you want to delete ${Employee}'s record?`)) {
            axios.delete(`${mock_url}/${id}`)
                .then(() => {
                    setRecord(a => a.filter((userrecord) => userrecord.id !== id));
                    setMsg("Record Deleted Successfully");
                    setIsShow(true);
                })
                .catch((e) => console.error(e));
        }
    }

    //5. Update Logic
    function Updatelogic() {
        axios.put(`${mock_url}/${id}`,
            {
                name: name,
                email: email,
                password: pswd,
                age: age,
                gender: gender
            }
        )
        .then(() => {
            setRecord((i) => i.map((a) => a.id === id ? {
                ...a,
                name: name,
                email: email,
                password: pswd,
                age: age,
                gender: gender
            } : a));
            setMsg("Record Updated Successfully");
            setIsShow(true);
        }).catch((e) => { console.error(e); });
    }

    //6. Timer for Message Display
    useEffect(() => {
        if (isshow === true) {
            var timer = setTimeout(() => { setIsShow(false); }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isshow]);

    //7. Search and Sort Logic
    let search_Student = search ?
        record.filter((abc) => abc.name.toLowerCase().includes(search.toLowerCase())) :
        record;

    if (sort === "asc") {
        search_Student = search_Student.sort((a, b) => a.expectedSalary - b.expectedSalary);
    } else if (sort === "desc") {
        search_Student = search_Student.sort((a, b) => b.expectedSalary - a.expectedSalary);
    } else if (sort === "az") {
        search_Student = search_Student.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "za") {
        search_Student = search_Student.sort((a, b) => b.name.localeCompare(a.name));
    }

    return (
        <div className='container'>
            <h1>Welcome{user_name}</h1>
            <Link className="btn btn-warning my-3" to="/s">Add Student +</Link>
            <input
                type="text"
                placeholder='Enter Name To Search Student'
                className='form-control my-3'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select className='form-control my-3'
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="">Sort by Salary</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                <option value="az">A-Z Order</option>
                <option value="za">Z-A Order</option>
            </select>
            {isshow &&
                (
                    <h4>{msg}</h4>
                )}
            <div className="row">
                {record.length === 0 ?
                    (
                        <p style={{ color: "red" }}>No Student Record Found!</p>
                    ) :
                    (
                        search_Student.map((a) => (
                            <div className="card" key={a.id}>
                                <div className="card-body">
                                    <h4 className="card-title">{a.name}</h4>
                                    <p className="card-text">{a.email}</p>
                                    <button className="btn btn-danger"
                                        onClick={() => DeleteRecord(a.id, a.name)}>Remove
                                        <i className="bi bi-trash-fill"></i></button>
                                    <button className="mx-2 btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() =>
                                            fetch_Record(a.name, a.email, a.password, a.gender, a.age, a.id)
                                        }>
                                        Update <i className="bi bi-pencil-fill"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }
                {
                    search_Student.length === 0 &&
                    (
                        <p style={{ color: "red", textAlign: "center" }}>No Searched Record Found!</p>
                    )
                }
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className='form-control my-3' value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input type="text" className='form-control my-3' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="text" className='form-control my-3' value={pswd} onChange={(e) => { setPswd(e.target.value) }} />
                            <input type="text" className='form-control my-3' value={age} onChange={(e) => { setAge(e.target.value) }} />
                            <input type="radio" name="gender" value="Male" onChange={(e) => { setGender(e.target.value) }} /> &nbsp; Male &nbsp;
                            <input type="radio" name="gender" value="Female" onChange={(e) => { setGender(e.target.value) }} /> &nbsp; Female &nbsp;
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary close_btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    Updatelogic()
                                    document.querySelector(".close_btn").click()
                                }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}