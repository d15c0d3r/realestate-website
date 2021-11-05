import React,{useState,useEffect,useContext}  from 'react'
import {BrowserRouter,Route , Switch} from "react-router-dom"
import Buy from './Components/Buy'
import Home from "./Components/Home"
import ProtectedRoute from "./Components/ProtectedRoute"
import Sell from './Components/Sell'
import MyUploads from "./Components/MyUploads"
import Login from "./Components/Login"
import Cookies from "js-cookie"
import axios from "axios"
import {TokenContext}  from "./Context/tokenContext"

function App() {
  const {isTokenValid,setIsTokenValid} = useContext(TokenContext)

  useEffect(()=>{
    const checkLoggedIn = async ()=>{
      const token = Cookies.get("jwt")
      const {data} = await axios.post("http://localhost:5000/isTokenvalid",{token})
      setIsTokenValid(data)
      console.log(Cookies.get("jwt"))
    }
    checkLoggedIn()
  },[])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/"><Home/></Route>
        <Route exact path = "/login"><Login/></Route>
        <ProtectedRoute exact path = "/myUploads" component={MyUploads}/>
        <ProtectedRoute exact path = "/sell" component = {Sell}/>
        <ProtectedRoute exact path = "/buy" component={Buy}/>
      </Switch>
    </BrowserRouter>  
  );
}

export default App;
