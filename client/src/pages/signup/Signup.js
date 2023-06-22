import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManger";
import './Signup.scss'

function Signup() {
  const navigate=useNavigate();
  const[name,setName]=useState('');
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });

      console.log(response);
      setItem(KEY_ACCESS_TOKEN,response.result.accesstoken)
      navigate('/')

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" className="name" id="name" onChange={(e)=>setName(e.target.value)} />

          <label htmlFor="email">email</label>
          <input type="email" className="email" id="email" onChange={(e)=>setEmail(e.target.value)} />

          <label htmlFor="password">password</label>
          <input type="password" className="password" id="password"  onChange={(e)=>setpassword(e.target.value)} />

          <input type="submit" className="submit" />
        </form>

        <p className="subheading">
         Already have an account?  Do not not have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
