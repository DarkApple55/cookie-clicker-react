import { useState, useEffect } from "react"


const useFetch = (request) => {

    // fetch("http://localhost:3001/Cupcakes").then(response => response.json()).then(data => setCupcakes(data))
    const db_GetData = async request => {
        const response = await fetch(`${process.env.REACT_APP_URL_API}${request}`)
        const data = await response.json()
        return data
    }
    
    const [data, setData] = useState([])
    const [errorData, setErrorData] = useState()

    useEffect(() => {db_GetData(request).then(data => setData(data)).catch(err => setErrorData(err))}, [request])

    // se ejecuta la función (parámetro 1) cada vez que se modifica el valor del 2do. poner [] = solo se ejecute al principio

    return [data, errorData]

    // JSON.stringify(errorData) // JSON to String
}

export default useFetch