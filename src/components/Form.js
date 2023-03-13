import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }
    // form data is valid, submit to backend
    const formData = { name, email, dob, mobile };
    fetch("http://localhost:5000/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
        } else {
          alert("Error submitting form.");
        }
      })
      .catch((error) => {
        alert("Error submitting form.");
        console.error(error);
      });
  };

  const validateForm = () => {
    const errors = [];
    const age = calculateAge(new Date(dob));
    if (age < 18) {
      errors.push("You must be at least 18 years old to submit this form.");
    }
    if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
      errors.push("Mobile number is invalid.");
    }
    return errors;
  };

  const calculateAge = (birthday) => {
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="tel"
          id="mobile"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
        />
      </div>
      {errors.map((error, index) => (
        <div key={index} style={{ color: "red" }}>
          {error}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
