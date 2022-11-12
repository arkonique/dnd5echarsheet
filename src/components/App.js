import React from 'react';
import { parseCookies } from '../functions';
import Login from './Login';
import Register from './Register';
import Sheet from './Sheet'

function App() {
  const [login,setLogin] = React.useState(false)
  const [singUpInSwitch,setsignUpInSwitch] = React.useState("in");
  
  function changeLogState(e){
    if (e===true){
      setLogin(true)
    }
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
    return (<Sheet />);
  }
}

export default App;
