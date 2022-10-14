import React,{useState} from "react";
import {Link, useHistory} from 'react-router-dom'; 


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  
    let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDt8YinXVEx0C7pqrKBiYFIaGPM4P9HrBc";

  if (password) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("logged in Successfully");
          return res.json();
        } else {
          return res.json().then((data) => {

            let errorMessage = "Authentication failed";

            throw new Error(errorMessage);
          });
        }
      })
       .then((data) => {
        localStorage.setItem("idToken", data.idToken);
        history.push('/welcome');
       })
       .catch((err) => {
          alert(err.message);
       });
       } else {
          alert("password didn't match");
       };

       setEmail("");
       setPassword("");
      

};

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
          type='email'
          required
          value={email}
          onChange={emailHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          type='password'
          required
          value={password}
          onChange={passwordHandler}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <Link to='/signup'>Sign Up</Link>
        </div>
        
        </form>
      <button>
        <Link to='/forget'>Forgot Password</Link>
      </button>
    </section>
  
  );
};

export default Login;
