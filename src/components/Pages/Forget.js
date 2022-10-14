import React,{useState} from "react";

import { useHistory } from "react-router-dom";

const Forget = () => {
    const [email, setEmail] = useState();

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const emailHandler = (event) => {
     setEmail(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDt8YinXVEx0C7pqrKBiYFIaGPM4P9HrBc",
            {
                method: "POST",
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email,
                }),
            }
            )
            .then((res) => {
                if (res.ok) {
                    alert("Link has been sent to you");
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        alert("please enter valid email")
                    });
                }
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                history.push("/login");
            });
    };

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div>
                <div>
                    <label htmlFor="email">
                        Enter Registered Email
                    </label>
                </div>
                <input 
                type='email'
                placeholder="enter your email"
                onChange={emailHandler}
                />
                <div>
                {!loading && <button>Send Link</button>}
            {loading && <p>Loading...</p>}
                </div>
                </div>
            </form>
        </div>
    );
};

export default Forget;