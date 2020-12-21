import React,{useEffect,createContext,useReducer,useContext} from 'react'
import './App.css';
import {BrowserRouter,Route, Switch, useHistory} from "react-router-dom"
import { initialState, reducer } from './reducer/userReducer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BasicProfile from './components/BasicProfile';
import Details from './components/Details';
import Skills from './components/Skills';

export const UserContext = createContext()

const Routing =()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("User"))
    console.log(user)
    
    if(user){
      dispatch({type:"USER",playload:user})
      history.push("/")
    }
    else{
      history.push("/Signin")
    }
  },[dispatch,history])
  return (
    <Switch>
      <Route  exact path='/' component={BasicProfile}/>
      <Route  exact path='/Signin' component={Signin}/>
      <Route  exact path="/Signup" component={Signup}/>
      <Route  exact path="/Skills" component={Skills}/>
      <Route  exact path="/Details" component={Details}/>
     
    </Switch>
  )

}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <div className="App">

      <Routing/>
     
    </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
