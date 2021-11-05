import React , {useState} from 'react'
import Navbar from './Navbar'
import axios from "axios"
import { ContactsOutlined } from '@material-ui/icons'

function ShowLands({lands}) {
    if([lands]){
        const Lands = lands.map(land=>{
            return(
                <div key = {land._id}>
                    <span>{land.city}</span>
                    <br/>
                    <span>{land.landmark}</span>
                    <br/>
                    <span>{land.pin}</span>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )
        })
        return (
            <div>
                {Lands}
            </div>
        )
    }else{
        alert("no data found")
    }
}


function Buy() {
    const [pin,setPin]  = useState("")
    const [lands,setLands] = useState([])
    const onClickHandler = async (e)=>{
        e.preventDefault()
        const {data} = await axios.get(`http://localhost:5000/buy/${pin}`)
        console.log(data)
        if(data ==="no data"){
            alert("no data found")
        }else{
            setLands(data)
        }
    }
    return (
        <div>
            <form onSubmit = {(e)=>{onClickHandler(e)}}>
            <Navbar/>
            <label htmlFor = {"pin"}>PinCode</label>  
            <input id = {"pin"} onChange = {(e)=>{setPin(e.target.value)}}/> 
            <button>Find</button>
            </form>           
            <br/>
            <br/>
            <ShowLands lands = {lands}/>
        </div>
    )
}

export default Buy
