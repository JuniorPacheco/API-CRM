import { useState, useEffect } from "react"
import axios from 'axios'

const useDataId = (id) => {
    const [cargando, setCargando] = useState(true)
    const [dataID, setDataID] = useState({})
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        axios.get(url)
        .then(res => setDataID(res.data))
        .catch(err => console.log(err))
        .finally(() => setCargando !== undefined ? setCargando(false) : "")
    }, [])

  return { dataID, cargando }
}

export default useDataId