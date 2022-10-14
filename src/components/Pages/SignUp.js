import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const history = useHistory();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmHandler = (event) => {
    setConfirm(event.target.value);
  };
  
  const submitHandler = (event) => {
  event.preventDefault();

  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDt8YinXVEx0C7pqrKBiYFIaGPM4P9HrBc";
  
   if(password === confirm){
    fetch(url, {
      method : "POST",
      body : JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
      }),
      header: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (res.ok){
        alert('Signed Up');
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication failed';
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      localStorage.setItem("idToken", data.idToken);
      console.log(data.idToken);
      history.push('/login');
    })
    .catch((err) => {
      alert(err.message)
    });
   } else{
    alert("password didn't match");
   }
   
   setConfirm('');
   setEmail('');
   setPassword('');
  };

  return (
    <section>
      <h1>SignUp</h1>
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
          <label htmlFor="password">Confirm Password</label>
          <input
          type='password'
          required
          value={confirm}
          onChange={confirmHandler}
          />
        </div>
        <div>
          <button>SignUp</button>
        </div>
        <div>
          <Link to='/login'>Login</Link>
        </div>
      </form>
      
    </section>
  
  );
};

export default SignUp;
