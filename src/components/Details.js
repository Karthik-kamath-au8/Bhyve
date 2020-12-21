import React, { useState,useEffect } from 'react'
import axios from "axios";

const Details = () => {
    const [details,setDetails] = useState("")
    useEffect( ()=>{
        async function fetchData(){ 
        const result = await axios("https://be.bhyve-app.com:3020/user/profile",{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            }
        })
        setDetails(result.data)
        console.log(result.data)
        }
        fetchData()

    },[])

    
    
    return (
        <div className="mycard">
            <div className="card auth-card">
            <h3>User's Profile</h3>
            <h5>Firstname:{details.firstName}</h5>
            <h5>Lastname:{details.lastName}</h5>
            <h5>Email:{details.username}</h5>
            <h5>Skills:{details.skills}</h5>
            
            
            </div>
         
         
        </div>
    )

}
export default Details
