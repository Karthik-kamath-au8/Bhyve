import React,{useState} from 'react';
// import Select from 'react-select';

// import { AsyncPaginate } from "react-select-async-paginate";





const SkillsPost = ({skills,loading}) => {
    // const [select,setSelect]=useState([])
    
    if(loading){
        
        return <h2>Loading...</h2>

    }
    console.log(skills)
  
 
   

    

   
    return (
        <div  className="Container">

        
        
        

        


        <ul>
        {skills.map((item)=>{
            return (
            <li value={item.id}>{item.skillName}</li>
            )
            }
        )
    }
    
        </ul>  
 
            
        </div>
    )
}
export  default SkillsPost;
