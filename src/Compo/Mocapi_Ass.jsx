import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Mocapi_Ass() {
    const [records, setRecords] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState(null);
    const apiUrl = "https://67ad88033f5a4e1477ddf5ae.mockapi.io/mocapi";

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get(apiUrl);
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const addRecord = async () => {
        if (!name || !email) return alert("Please fill in all fields");
        try {
            const response = await axios.post(apiUrl, { name, email });
            setRecords([...records, response.data]);
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding record", error);
        }
    };

    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`${apiUrl}/${recordId}`);
            setRecords(records.filter(record => record.id !== recordId));
        } catch (error) {
            console.error("Error deleting record", error);
        }
    };

    return (
        <div className='container'>
            <h1>MockAPI CRUD - Grand Assignment</h1>
            <h2>Form Submission</h2>

            <label>Full Name (Required)</label>
            <input type="text" name="full_name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Email (Required)</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <button onClick={addRecord}>Add Record</button>

            <h3>Records List</h3>
            {records.length === 0 ? <p>No records found</p> : (
                <ul>
                    {records.map(record => (
                        <li key={record.id}>
                            {record.name} - {record.email}
                            <button onClick={() => deleteRecord(record.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
