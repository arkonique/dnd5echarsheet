import React from 'react'
import { verifyUser } from '../functions';
import Info from "./Info";

function Login(props){

    const [loginData,setLoginData] = React.useState({uname:'',password:''})
    const [message,setMessage] = React.useState("");
    function updateData(e){
        var data = loginData
        data[e.id] = e.value
        setLoginData(data)
    }

    async function sendLogin(){
        const check = await verifyUser(loginData.uname,loginData.password);
         if (!check) {
            document.cookie = "login=true"; /////////////////////////////////////////// Change cookies to session variables through API (set session variable here)
            props.checkLogin(true);
         }
         else {
            let msg;
            if (loginData.uname==='' || loginData.password===''){
                msg="Please fill out both fields"
            }
            else{
                msg=check===1?"Username (or both username and password) is incorrect":"Password you entered is incorrect";
            }
            setMessage(msg);
         }
    }

    return(
        <div>
            <p className="message">{message}</p>
            <Info id="uname" label="Username" labeldisp={1} onEdit={e => updateData(e)}/>
            <Info id="password" label="Password" labeldisp={1} onEdit={e => updateData(e)}/>
            <button id="btn-login" onClick={sendLogin}>Login</button>
        </div>
    )
}

export default Login