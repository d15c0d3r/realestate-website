import React , {useEffect,useContext} from 'react'
import {useHistory} from "react-router-dom"
import AppBar from '@material-ui/core/AppBar'
import {Typography, makeStyles,Button} from "@material-ui/core"
import Toolbar from '@material-ui/core/Toolbar';
import {TokenContext}  from "../Context/tokenContext"
import Cookies from "js-cookie"

const useStyles = makeStyles({
    appbarStyles : {
        position : "static",
        display : "block",
        flexDirection : "row",
        padding : "10px",
    },
    title: {
        flex: 1,
    },
    buttonStyles:{
        color : "white",
        border : "1px solid white",
        marginLeft : "10px"
    },
})

function Navbar(props) {
    const {isTokenValid,setIsTokenValid} = useContext(TokenContext)
    const classes = useStyles()
    const history = useHistory()
    const checkTitle = ()=>{
        if(window.location.href === "http://localhost:3000/buy"){
            return "Buy"
        }else if(window.location.href === "http://localhost:3000/sell"){
            return "Sell"
        }else if (window.location.href === "http://localhost:3000/"){
            return "Home"
        }else if (window.location.href === "http://localhost:3000/myUploads"){
            return "MyUploads"
        }else if (window.location.href === "http://localhost:3000/login"){
            return "Login"
        }
        else{
            return null
        }
    }
    
    const pushToHome = (e)=>{
        history.push("/")
    }
    const pushToLogin = (e)=>{
        history.push("/login")
    }
    const  pushToBuy = (e)=>{
        history.push("/buy")
    }
    const pushToSell = (e)=>{
        history.push("/sell")
    }
    const pushToMyuploads = (e)=>{
        history.push("/myUploads")
    }
    const handleLogout = (e)=>{
        setIsTokenValid(false)
        Cookies.remove('jwt', { path: ''})
        window.location.reload()
    }
    
    return (
        <div style = {{position : "relative" , minHeight:"100%"}}>
            <AppBar className = {classes.appbarStyles}>
                <Toolbar>
                        <Typography variant="h4" className={classes.title}>{checkTitle()}</Typography>
                        {(window.location.href !== "http://localhost:3000/") ? (<Button onClick = {(e)=>{pushToHome(e)}} varaint = "outlined" className={classes.buttonStyles}>Home</Button>) : (null)}
                        {(window.location.href !== "http://localhost:3000/login" && isTokenValid.exists===false) ? (<Button onClick = {(e)=>{pushToLogin(e)}} varaint = "outlined" className={classes.buttonStyles}>LogIn</Button>) : (null)}
                        {(window.location.href !== "http://localhost:3000/buy") ? (<Button onClick = {(e)=>{pushToBuy(e)}} varaint = "outlined" className={classes.buttonStyles}>Buy</Button>): (null)}
                        {(window.location.href !== "http://localhost:3000/sell") ? (<Button onClick = {(e)=>{pushToSell(e)}} varaint = "outlined" className={classes.buttonStyles}>Sell</Button>) : (null)}
                        {(window.location.href !== "http://localhost:3000/myUploads" && isTokenValid.exists===true) ? (<Button onClick = {(e)=>{pushToMyuploads(e)}} varaint = "outlined" className={classes.buttonStyles}>MyUploads</Button>) : (null)}
                        {(isTokenValid.exists===true)?(<Button onClick = {(e)=>{handleLogout(e)}} varaint = "outlined" className={classes.buttonStyles}>Logout</Button>):(null)}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
