import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManger";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      console.log(response);
      setItem(KEY_ACCESS_TOKEN, response.result.accesstoken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>

        <p className="subheading">
          Do not not have account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
