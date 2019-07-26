import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class Login extends React.Component{
    constructor() {
        super()
        this.state = {
            accessToList : false,
            Username:'',
            pwd:'',
            msg:''
        }
        this.auth = this.auth.bind(this);
        this.reg = this.reg.bind(this);
      }
      async reg(){
        const username=document.getElementById('outlined-username').value
        const password = document.getElementById('outlined-password-input').value
        console.log(username,password)
        const hash = await this.sha256(password);
        console.log(hash)
        const data={
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body:JSON.stringify({username:`${username}`,hash:`${hash}`})
      }
          const res = await fetch(`http://localhost:2000/reg`,data);
          const jsonD = await res.json();
          console.log(jsonD)
          
          if (jsonD.status===200) {
              return <Box>{jsonD.msg}</Box>
                  //this.handleLogin(document.getElementById('outlined-username').value)
                  } else {
                      console.log("error");
                      return false
                  }
        
      } 
   async auth(){

        const username = await this.checkCredentials();  
        // console.log(loginCredentials[1])
        if(username !== false){
        // console.log(value)
            this.setState({ accessToList : true, Username:`${username}`, pwd:'enc',msg:`Howdy, ${username}`});
        }else{
            this.setState({ accessToList : false,Username:'',pwd:'',msg: "sorry Username and password doesn't match",});
         }
    }
    async  sha256 (message){

      // encode as UTF-8
      const msgBuffer = new TextEncoder('utf-8').encode(message);
  
      // hash the message
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
      // convert ArrayBuffer to Array
      const hashArray = Array.from(new Uint8Array(hashBuffer));
  
      // convert bytes to hex string
      const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
      return hashHex;
  }
  async  checkCredentials() {
    const username=document.getElementById('outlined-username').value
    const password = document.getElementById('outlined-password-input').value
    const hash = await this.sha256(password);
     console.log(hash)
   const data={
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body:JSON.stringify({username,hash})
}
    const res = await fetch(`http://localhost:2000/login`,data);
    const jsonD = await res.json();
    console.log(jsonD)
    
    if (jsonD.status===200) {

            return username
            //this.handleLogin(document.getElementById('outlined-username').value)
            } else {
                console.log("error");
                return false
            }
    
  }

     render(){
        if (this.state.accessToList === true) {
            console.log('rendering, wait')
            return <Redirect to={{
                            pathname:'/todoapp',
                            state:{
                                    msg:this.state.msg,
                                    usr:this.state.Username,
                                    pwd:this.state.pwd,
                                }
                        }} />
            }
  
  
  return (
    <div>
       <Typography component="div">
      
      <Box fontWeight="fontWeightBold" style={{ fontSize:'24px' ,color:'#78c0d3'}} m={1}>
        Login
      </Box>
    </Typography>
      {/* <form className='container' style={{  display: "flex",flexDirection: "column"}} noValidate autoComplete="off"> */}
        <div>
            {this.state.msg}
          <TextField
            id="outlined-username"
            label="Username"
            margin="normal"
            type="text"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            id="outlined-password-input"
            label="Password"
            style={{marginRight:'1px', marginLeft:'1px'}}
            type="password"
            margin="normal"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
        <button className='loginButton'style={{margin:'5px', height: '50px', borderRadius:'50px',width:'230px' }} onClick={this.auth.bind(this)}>Login</button>
        <button className='loginButton'style={{margin:'5px', height: '50px', borderRadius:'50px',width:'230px' }} onClick={this.reg.bind(this)}>Register</button>

        </div>
      {/* </form> */}
         </div>
  );
  }
}
export default Login;
