import { useAppSelector, useAppDispatch } from '../../app/hooks';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { logout, newLoginAsync, selectLogged, selectUserName } from "./loginSlice";
const Register = () => {
    const [username, setuname] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("a@a.com")
    const dispatch = useAppDispatch();
    const logged = useAppSelector(selectLogged);
    const userName = useAppSelector(selectUserName);
  
    return (
    <div>
        {logged? <div>
            Hi {userName},{" "}
            <button onClick={()=>dispatch(logout())}>Logout</button>
        </div>: 
        <div>
            <h1 style={{ textAlign: "center" }}>
            </h1>
            <hr/>
            User name: <input onChange={(e) => setuname(e.target.value)} />
            Password: <input onChange={(e) => setpassword(e.target.value)} />
            email: <input onChange={(e) => setemail(e.target.value)} />
            <Button onClick={() =>dispatch( newLoginAsync({username,password,email}))}>Register</Button>
        </div>}
        </div>
    );
}

export default Register