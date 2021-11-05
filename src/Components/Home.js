import React , {useState,useContext} from 'react'
import Navbar from "./Navbar"
import axios from "axios"
import Cookies from "js-cookie"
import {TokenContext}  from "../Context/tokenContext"

function Home() {

    return (
        <div>
            <Navbar/>
            <Signup/>
        </div>
    )
}

function Signup (){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const {setIsTokenValid,setContextEmail} = useContext(TokenContext)

    const submitHandler = async(e)=>{
        e.preventDefault()
        //validation code
        console.log({name,email,phone,password})
        console.log("submitting...")
        const {data} = await axios.post(`http://localhost:5000/signup`,{name,email,password,phone})
        console.log(data)
        if(data.token){
            Cookies.set("jwt",data.token)
            setIsTokenValid({exists : true})
            setContextEmail(data.email)
        }else{
            alert("Signup failed!")
        }
    }

    return(
        <div>
            <form onSubmit = {(e)=>{submitHandler(e)}}>
                <label htmlFor = {"name"}>Name</label>
                <br/>
                <input id = {"name"} onChange = {(e)=>{setName(e.target.value)}}/>
                <br/>
                <label htmlFor = {"email"}>Email</label>
                <br/>
                <input id = {"email"} onChange = {(e)=>{setEmail(e.target.value)}}/>
                <br/>
                <label htmlFor = {"phone"}>Phone</label>
                <br/>
                <input id = {"phone"} onChange = {(e)=>{setPhone(e.target.value)}}/>
                <br/>
                <label htmlFor = {"password"}>Password</label>
                <br/>
                <input id = {"password"} type = {"password"} onChange = {(e)=>{setPassword(e.target.value)}}/>
                <br/>
                <label htmlFor = {"confirm"}>Retype-Password</label>
                <br/>
                <input id = {"confirm"} type = {"password"} onChange = {(e)=>{setConfirm(e.target.value)}}/>
                <br/>
                <button>Submit</button>
            </form>
        </div>    
    )
}

export default Home
