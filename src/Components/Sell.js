import React , {useState} from 'react'
import Navbar from './Navbar'
import axios from "axios"
import Cookies from "js-cookie"
import {makeStyles} from "@material-ui/core"

function Show({msg}) {
    if(msg.show){
        return (
            <span>{msg.data}</span>
        )
    }else{
        return null
    }
}

function Sell() {
    const [pin,setPin] = useState(null)
    const [city,setCity] = useState(null)
    const [landmark,setLandmark] = useState(null)
    const [errorMsg,setErrorMsg] = useState(null)
    const [msg,setMsg] = useState({show : false, data : undefined})

    const validate = ()=>{
        //validation code
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        console.log(Cookies.get("jwt"))
        let {data} = await axios.post(`http://localhost:5000/isTokenValid`,{token : Cookies.get("jwt")})
        const email = data.email
        if(data.exists){
            const {data} = await axios.post(`http://localhost:5000/sell`,{pin, city, landmark,email})
            console.log(data)
            if(data.created){
                setMsg({show : true, data : "Details set"})
            }else{
                setMsg({show : true, data : "Details setting failed"})
            }
        }else{
            alert("please login first")
        }
    }
    return (
        <div>
            <Navbar/>
            <form onSubmit = {(e)=>onSubmitHandler(e)}>
                <label htmlFor = {"pincode"}>Pin Code</label>
                <br/>
                <input id = {"pincode"} onChange = {(e)=>{setPin(e.target.value)}}/>
                <br/>
                <label htmlFor = {"city"}>City</label>
                <br/>
                <input id = {"city"} onChange = {(e)=>{setCity(e.target.value)}}/>
                <br/>
                <label htmlFor = {"landmark"}>Land Mark</label>
                <br/>
                <input id = {"landmark"} onChange = {(e)=>{setLandmark(e.target.value)}}/>
                <br/>
                <button>Submit</button>
                <br/>
                <br/>
                <Show msg = {msg} />
            </form>
        </div>
    )
}

export default Sell
