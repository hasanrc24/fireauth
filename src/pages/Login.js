import React, { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const [reg, setReg] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register a user
    if (reg) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      // User Login
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        setUser(user);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   Google Sign In
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      {reg ? <h2>Register</h2> : <h2>Login</h2>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {reg ? (
          <button className="btn btn-primary">Register</button>
        ) : (
          <button className="btn btn-primary">Login</button>
        )}
      </form>
      {reg ? (
        <span>
          Already have an account?{" "}
          <span onClick={() => setReg(!reg)} className="toggle-login">
            Login
          </span>
        </span>
      ) : (
        <span>
          Don't have an account?{" "}
          <span onClick={() => setReg(!reg)} className="toggle-login">
            Register
          </span>
        </span>
      )}
      <br />
      <button onClick={signInWithGoogle} className="btn btn-primary ggl">
        Sign In with google
      </button>
    </div>
  );
};

export default Login;
