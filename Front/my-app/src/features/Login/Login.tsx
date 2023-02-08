import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync, selectUserName, selectLogged,logout} from './loginSlice';


export const  Login=()=> {
    const userName = useAppSelector(selectUserName);


    const logged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const [username, setuser] = useState("")
    const [password, setpwd] = useState("")

    return (
        <div>

            {logged ? <div>
               Hi {username}{" "}
                <button onClick={()=>dispatch(logout())}>Logout</button>
            </div> :
                <div>
                    UserName:<input onChange={(e) => setuser(e.target.value)} />
                    Pwd:<input onChange={(e) => setpwd(e.target.value)} /><br />
                    <button onClick={() => dispatch(loginAsync({ username, password }))}>login</button>
                    
                </div>}
        </div>
    );
}