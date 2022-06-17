import { useState, useEffect } from "react"
import axios from 'axios'

const useDataId = (id) => {
    const [cargando, setCargando] = useState(true)
    const [dataID, setDataID] = useState({})
    useEffect(() => {
        const url = `http://localhost:4000/clientes/${id}`
        axios.get(url)
        .then(res => setDataID(res.data))
        .catch(err => console.log(err))
        .finally(() => setCargando !== undefined ? setCargando(false) : "")
    }, [])

  return { dataID, cargando }
}

export default useDataId