import {useEffect, useState} from 'react'
import axios from 'axios'
import Cliente from '../components/Cliente'

const Inicio = () => {
  const [clientes, setClientes] = useState([])

  const handleDelete = personalID => {
      const confirmar = confirm('¿Deseas eliminar este cliente?')
      if(confirmar){
        const url = `${import.meta.env.VITE_API_URL}/${personalID}`
        axios.delete(url)
        .then(res => console.log('Eliminado correctamente'))
        .catch(err => console.log(err))
        .finally(() => {
          const arrayClientes = clientes.filter(cliente => cliente.id !== personalID)
          setClientes(arrayClientes)
        })
      }
  }

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL
    axios.get(url)
    .then(res => setClientes(res.data))
    .catch(err => console.log(err))
  }, [])
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>    

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>   
    </>
  )
}

export default Inicio