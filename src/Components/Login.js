import React,{useState,useContext} from 'react'
import Navbar from './Navbar'
import axios from "axios"
import Cookies from "js-cookie"
import {useHistory} from "react-router-dom"
import {TokenContext}  from "../Context/tokenContext"

function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory()
    const {setIsTokenValid,setContextEmail} = useContext(TokenContext)
    const submitHandler = async(e)=>{
        e.preventDefault()
        const {data} = await axios.post("http://localhost:5000/login",{email,password})
        if(data.token){
            Cookies.set("jwt",data.token)
            setIsTokenValid({exists : true})
            setContextEmail(data.email)
            history.push("/buy")
        }else{
            alert(`${data}`)
        }
    }

    return (
        <div>
            <Navbar/>
            <form onSubmit = {(e)=>{submitHandler(e)}}>
                <label htmlFor = {"email"}>Email</label>
                <br/>
                <input id = {"email"} onChange = {(e)=>{setEmail(e.target.value)}}/>
                <br/>
                <label htmlFor = {"password"}>Password</label>
                <br/>
                <input id = {"password"} type = {"password"} onChange = {(e)=>{setPassword(e.target.value)}}/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login
