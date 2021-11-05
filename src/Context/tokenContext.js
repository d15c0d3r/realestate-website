import React,{createContext,useState} from "react"

export const TokenContext = createContext(false)

export const TokenContextProvider = ({children})=>{
    const [isTokenValid,setIsTokenValid] = useState(false)
    const [contextEmail,setContextEmail] = useState(undefined)

    return(
        <TokenContext.Provider value = {{isTokenValid,setIsTokenValid,contextEmail,setContextEmail}}>
            {children}
        </TokenContext.Provider>
    )
}