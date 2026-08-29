import React, { useState, useEffect } from "react";

function Registrationform() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const [users, setUsers] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setApiData(data));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        let tempError = {};
        if (!formData.name) tempError.name = "Name is required";
        if (!formData.email.includes("@")) tempError.email = "Email is invalid (@ is missing)";
        if (formData.password.length < 6) tempError.password = "Password must be at least 6 characters";
        setError(tempError);
        return Object.keys(tempError).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setUsers([...users, formData]);
            setFormData({ name: "", email: "", password: "" });
            setError({});
            setSuccess(true);
        }
    };
  return (
    
        <div className="registration-container">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
                {error.name && <p className="error">{error.name}</p>}

                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                {error.email && <p className="error">{error.email}</p>}

                <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
                {error.password && <p className="error">{error.password}</p>}

                <button type="submit">Register</button>
            </form>

            {success && <p className="success-msg">Registration Successful!</p>}

            <div className="user-list">
                <h3>Registered Users (Local)</h3>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.name} - {user.email}</li>
                    ))}
                </ul>

                <h3>API Data</h3>
                <ul>
                    {apiData.slice(0, 3).map((user) => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            </div>
        </div>
      
    
  )
}

export default Registrationform;