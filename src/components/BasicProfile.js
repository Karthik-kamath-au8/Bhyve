
import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import M from 'materialize-css';


const BasicProfile = ()=> {
    const [firstName,setFirstName] =useState("");
    const [lastName,setLastName] =useState("");
   
    const history=useHistory()

  

    const basic = ()=>{
        fetch("https://be.bhyve-app.com:3020/user/basic/profile",{
                method:"post",
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("jwt"),
                    "Content-Type":"application/json",  
                },
                body:JSON.stringify({
                    firstName:firstName,
                    lastName:lastName,    
                })    
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            M.toast({html:data.error,classes:"#c62828 red draken-3"})

        }else{
            history.push("/Skills")
        }
        
        
        
    })
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
        <Form onSubmit={(e)=>{e.preventDefault()}} >
                {/* <h4>{state?state.name:"Loading"}</h4> */}
                <h4>Basic Details</h4>
                <input type="text" placeholder="Enter Firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder="Enter Lastname" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    
                <Button variant="primary" type="submit" onClick={()=>{basic()}}>
                    Submit
                </Button>
        </Form>
          
        </div>
        </div>

    )
}

export default BasicProfile;