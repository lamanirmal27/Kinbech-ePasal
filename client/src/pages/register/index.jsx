import "./styles.css";
import { Link, useAsyncError } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';
const userUrl = "/user";
const NAMEREGEX = /^(?!.*\d)(?!.*[^a-zA-Z\s]).{6,}$/;
const USERREGEX = /^(?![A-Z])\S{6,}$/;

function Register() {
  const userRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);

  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAMEREGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUser(USERREGEX.test(user));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !validUser) {
      return;
    }
    try {
      const response = await axios.post(
        userUrl,
        JSON.stringify({ name, user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success('Registration Success');
    } catch (err) {
      if (!err?.response) {
        toast.error("No response from server");
        console.log("No response from server");
      } else if (err.response?.status === 409) {
        console.log("Username already taken");
        toast.error("Username already taken");
      } else {
        toast.error("Registration Failed");
        console.log("Registration Failed");
      }
    }
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form">
        <span className="title">Sign up</span>
        <span className="subtitle">Create a account </span>
        <div className="form-container">
          <input
            ref={userRef}
            type="text"
            className="input"
            placeholder="Full Name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button disabled={!validName || !validUser}>Sign up</button>
      </form>
      <div className="form-section">
        <p>
          Have an account?
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
