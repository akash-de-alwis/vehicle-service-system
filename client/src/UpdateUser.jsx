import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [nic, setNIC] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + id)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setDate(result.data.date);
        setNIC(result.data.nic);
        setContact(result.data.contact);
        setEmail(result.data.email);
        setPosition(result.data.position);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();

    const birthYear = new Date(date).getFullYear();
    const nicPattern9 = /^[0-9]{9}v$/i; // 9 digit NIC with "v"
    const nicPattern12 = /^[0-9]{12}$/; // 12 digit NIC

    if (birthYear > 1999) {
      if (!nicPattern12.test(nic)) {
        setError('NIC must be a 12-digit number for birth years after 1999.');
        return;
      }
    } else {
      if (!nicPattern9.test(nic)) {
        setError('NIC must be a 9-digit number ending with "v" for birth years before 2000.');
        return;
      }
    }

    // Validate contact number length
    if (contact.length !== 12) {
      setError('Contact number must be exactly 12 digits.');
      return;
    }

    setError(''); // Clear any previous errors
    axios.put("http://localhost:3001/updateUser/" + id, { name, date, nic, contact, email, position })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="background d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px', borderRadius: '20px' }}>
        <form onSubmit={Update}>
          <h2>Update Employee</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {/* Form Fields */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              autoComplete='off'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              id="date"
              autoComplete='off'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nic" className="form-label">NIC</label>
            <input
              type="text"
              className="form-control"
              id="nic"
              placeholder="Enter NIC"
              autoComplete='off'
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              placeholder="Enter Contact Number"
              autoComplete='off'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              placeholder="Enter Your Position"
              autoComplete='off'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
