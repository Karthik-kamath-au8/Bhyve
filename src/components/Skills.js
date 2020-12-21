import React,{useState,useEffect} from 'react';
import axios from "axios";
import SkillsPost from "./SkillsPost"
// import loadOptions from "./loadOptions";
// import { AsyncPaginate } from "react-select-async-paginate";
import Pagination from "./Pagination"
import M from 'materialize-css';
import {useHistory} from "react-router-dom";
import Select from 'react-select';







const Skills = () =>{
    const history=useHistory()
    const [loading,setloading] =useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [skills,setSkills] =useState([]);
    const [selected,setSelected] =useState([]);
    const [postsPerPage]=useState(10)
    useEffect( ()=>{
        async function fetchData(){ 
        setloading(true);
        const result = await axios("https://be.bhyve-app.com:3020/skills")
        setSkills(result.data)
        console.log(result.data)
        setloading(false)

        }
        fetchData()

    },[])
    
    const indexOfLastPost= currentPage * postsPerPage
    const indexOfFirstPost =indexOfLastPost - postsPerPage;
    const currentPosts =skills.slice(indexOfFirstPost,indexOfLastPost)

    const paginate=(pageNumber)=> setCurrentPage(pageNumber)



        const SkillSelect = () =>{
            fetch("https://be.bhyve-app.com:3020/user/skills",{
                method:"post",
                headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                   skills:selected
                })
              }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"#c62828 red draken-3"})
                }else{
                    history.push("/Details")
                }
            }).catch(err=>{
              console.log(err)
          })
    
        }
        const options = skills.map(i=>(i.skillName))
        const option = [];
        for (let i=0;i<options.length;i++){
          option.push({
            value:options[i],
            label:options[i]
          })
        }
        
       
        

    return(
        <div className="container mt-5">
          <pre>{JSON.stringify(selected)}</pre>
        <Select 
          options={option}
          value={selected}
          isMulti
          onChange={setSelected}/>   
            
               
            <SkillsPost skills={currentPosts} loading={loading} />
           
            
            <br></br>
            <Pagination postsPerPage={postsPerPage} totalPosts={skills.length} paginate={paginate}/>
            
            <button variant="primary" type="submit" onClick={()=>{SkillSelect()}}>
                    Submit
            </button>


        </div>

    )
}


export default Skills
