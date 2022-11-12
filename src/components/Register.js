import React from 'react'
import { checkOcurrence, encodePassword, postData, verifyUser, randomBytesAsync } from '../functions';
import Info from "./Info";

export default function Register(props){

    const [registerData,setRegisterData] = React.useState({uname:'',password:'',name:'',token:'',dmcode:'',salt:''}) // In order of form appearance
    const [message,setMessage] = React.useState("");
    
    function updateData(e){
        var data = registerData;
        data[e.id] = e.value;
        setRegisterData(data);
    }
    
    async function sendRegister(){

        const check = await verifyUser(registerData.uname,'');
        const codeList = await postData('http://localhost/dnd_api/index.php/dm/codes');
        const n = checkOcurrence(registerData.dmcode,codeList);
        const newpw = await encodePassword(registerData.password);
        var data = registerData;
        data.password=newpw[0];
        data.salt=newpw[1];
        data.token = `u${(await randomBytesAsync(21)).toString('hex')}.${(await randomBytesAsync(3)).toString('hex')}`
        const dataArr = Object.values(data)
        var msg="";
        let allFields;
        setRegisterData(data);
        
        if (registerData.uname==='' || registerData.password==='' || registerData.name==='' || registerData.dmcode===''){
            allFields = 0;
        }
        else{
            allFields = 1;
        }

        const newCheck = allFields!==1 ? 1 : check!==1 ? 2 : n!==1 ? 3 : 0;
        if (newCheck===1) {msg="Please fill out all the fields"}
        else if (newCheck===2) {msg="Username not available"}
        else if (newCheck===3) {msg="Invalid DM code"}

        if (!newCheck) {
            console.log(registerData)
            postData('http://localhost/dnd_api/index.php/user/add',{data: dataArr})
            document.cookie = "login=true"; ///////////////////////////////////////////// Change cookies to session variables through API (set session variable here)
            props.checkLogin(true);
        }
        else {
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