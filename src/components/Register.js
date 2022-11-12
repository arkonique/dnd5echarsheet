import React from 'react'
import { verifyUser } from '../functions';
import Info from "./Info";

export default function Register(props){

    const [loginData,setLoginData] = React.useState(['','','','','',''])
    const [message,setMessage] = React.useState("");
    function updateData(e){
        var data = loginData
        data[e.id] = e.value
        setLoginData(data)
    }
    
    async function sendRegister(){
        /** 
         * 1. Do a verifyuser without a passwordcheck for username availability
         * 2. Check if DM code is valid
         * 3. Generate encoded password+salt
         * 4. Check if none of the fields are empty
         * 5. If 1 2 and 4 are all passed, then send data to API through the user/add endpoint
         * 6. Create login cookie
         */
        const check = await verifyUser(loginData.uname,loginData.password);
        if (!check) {
            // also create login cookie
            props.checkLogin(true);
        }
        else {
            const msg=check==1?"Username (or both username and password) is incorrect":"Password you entered is incorrect";
            setMessage(msg);
        }
    }


    return(
        <div>
            <p className="message">{message}</p>
            <Info id="name" label="Full name" labeldisp={1} onEdit={e => updateData(e)}/>
            <Info id="uname" label="Username" labeldisp={1} onEdit={e => updateData(e)}/>
            <Info id="password" label="Password" labeldisp={1} onEdit={e => updateData(e)}/>
            <Info id="dmcode" label="DM code" labeldisp={1} onEdit={e => updateData(e)}/>
            <button id="btn-login" onClick={sendRegister}>Register</button>
        </div>
    )
}