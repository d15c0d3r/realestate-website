import React,{useState,useContext} from 'react'
import {Route , Redirect} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import {TokenContext}  from "../Context/tokenContext"

function ProtectedRoute({component : Component , ...rest}) {
    const {isTokenValid,setIsTokenValid} = useContext(TokenContext)
    return(
        <Route
            {...rest}
            render = {()=> isTokenValid? <Component/> : <Redirect to = "/"/>}            
        />
    )
}

export default ProtectedRoute
