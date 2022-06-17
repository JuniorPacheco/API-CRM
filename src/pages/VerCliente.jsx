import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import useDataId from '../hooks/useDataId'

const VerCliente = () => {
    const { id } = useParams()

    const { dataID, cargando } = useDataId(id)

  return (
    cargando ? <Spinner/> : Object.keys(dataID).length === 0 ? 
    <p>No hay resultados</p> 
      : 
      (
        <div className='text-gray-600'>
              <h1 className="font-black text-4xl text-blue-900">Ver Cliente:{dataID.nombre}</h1>
              <p className="mt-3">Información del Cliente</p>
        
              {dataID.nombre && (
              <p className='text-3xl mt-10'>
                <span className='uppercase font-bold text-gray-800'>Cliente: </span>
                {dataID.nombre}
              </p>
              )}
              {dataID.email && (
              <p className='text-2xl'>
                <span className='uppercase font-bold text-gray-800'>Email: </span>
                {dataID.email}
              </p>
              )}
              {dataID.telefono && (
              <p className='text-2xl'>
                <span className='uppercase font-bold text-gray-800'>Telefono: </span>
                {dataID.telefono}
              </p>
              )}
              {dataID.empresa && (
              <p className='text-2xl'>
                <span className='uppercase font-bold text-gray-800'>Empresa: </span>
                {dataID.empresa}
              </p>
              )}
              {dataID.notas && (
                <p className='text-2xl'>
                  <span className='uppercase font-bold text-gray-800'>Notas: </span>
                  {dataID.notas}
                </p>
              )}
        </div>
      )
  )
}

export default VerCliente
