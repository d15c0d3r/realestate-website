import React,{useContext, useEffect,useState} from 'react'
import Navbar from './Navbar'
import {TokenContext} from "../Context/tokenContext"
import axios from "axios"

function ShowList({list}) {

    const clickHandler = ()=>{
        // onclick code
    }

    if(list){
        const List = list.map(element=>{
            return(
                <div key = {Math.random()}>
                    <span>{element.city}</span>
                    <br/>
                    <span>{element.landmark}</span>
                    <br/>
                    <span>{element.pin}</span>
                    <br/>
                    <button onClick = {(e)=>clickHandler(e)}>Delete</button>
                    <br/>
                    <br/>
                </div>
            )
        })
        return (
            <div>
                {List}
            </div>
        )
    }else{
        alert("no data found")
    }
}

function MyUploads() {
    const {contextEmail} = useContext(TokenContext)
    const [list,setList] = useState([])

    useEffect(()=>{
        console.log(contextEmail)
        const myuploads = async ()=>{
            const {data} = await axios.post(`http://localhost:5000/myuploads`,{email : contextEmail})
            if(data === "no data"){
                alert("no uploads yet")
            }else{
                setList(data)
            }
        }
        myuploads()
    },[])

    return (
        <div>
            <Navbar/>
            <ShowList list = {list}/>
        </div>
    )
}

export default MyUploads
