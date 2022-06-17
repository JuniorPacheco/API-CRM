import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import useDataId from '../hooks/useDataId'
import Spinner from '../components/Spinner'
import { data } from 'autoprefixer'
 
const EditarCliente = () => {

  const {id} = useParams()

  const { dataID, cargando } = useDataId(id)

  return (
    cargando ? 
      <Spinner /> 
    : (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-10'>Utiliza este formulario para editar datos del cliente</p>

            {dataID.nombre ? 
              <Formulario dataID={dataID}/> 
            : 
              <p className='mt-2 font-black text-2xl'>Cliente ID no válido</p>}
        </>
      )
  )
}

export default EditarCliente