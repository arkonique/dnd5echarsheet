import React from 'react';
import { parseCookies, setCookie } from '../functions';
import Login from './Login';
import Register from './Register';
import Characters from './Characters';
import Sheet from './Sheet'

function App() {
  const [login,setLogin] = React.useState(false)
  const [singUpInSwitch,setsignUpInSwitch] = React.useState("in");
  const [token,setToken] = React.useState("");
  const [charSelected,setCharSelected] = React.useState(false);
  const [charSrno,setCharSrno] = React.useState(0);
  
  async function changeLogState(e){
    if (e[0]===true){
      const uToken = e[1][0].token;
      setCookie('token',uToken,document.cookie);
      setToken(uToken);
      setLogin(true)
    }
  }

  function makeSelection(e){
    setCookie('srno',e,document.cookie);
    setCharSelected(true);
    setCharSrno(e);
  }
  
  function switchUp(){
    setsignUpInSwitch("up");
  }
  
  function switchIn(){
    setsignUpInSwitch("in");
  }

  const cookies = parseCookies(document.cookie); //////////////////////////////////////////// Use session variables through API (get session variable here)

  if (login===false && cookies.login!=='true'){
    if (singUpInSwitch==="in"){
      return(
        <div className="form-login">
          <nav>
            <p className='curr-nav'>Sign In</p>
            <button onClick={switchUp}>Sign Up</button>
          </nav>
          <Login checkLogin={(e) => changeLogState(e)}/>
        </div>
      )
    }
    else if (singUpInSwitch==="up"){
      return(
        <div className="form-login">
          <nav>
            <button onClick={switchIn}>Sign In</button>
            <p className='curr-nav'>Sign Up</p>
          </nav>
          <Register checkLogin={(e) => changeLogState(e)}/>
        </div>
      )
    }
  }
  else{
    if (charSelected===true){
      return (<Sheet token={charSrno}/>);
    }
    else{
      return (<Characters token={token} checkSelection={(e) => makeSelection(e)}/>);
    }
  }
}

export default App;
