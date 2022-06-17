import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Formulario = ({dataID}) => {

    const navigate = useNavigate();
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')            
                    .max(30, 'El nombre es muy largo')            
        .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no valido')            
                    .required('El email es Obligatorio'),
        telefono: Yup.number()
                    .positive('Un telefono no puede ser negativo')
                    .integer('Un telefono solo tiene numeros enteros')
                    .typeError('Número no valido'),
        notas: ''
    })

    const handleSubmit = (valores, resetForm) => {
        if(dataID?.nombre){
            const url = `${import.meta.env.VITE_API_URL}/${dataID?.id}`
            axios.put(url, valores)
            .then(res => {
                console.log(res.data)
                resetForm()
                navigate('/')
            })
            .catch(error => console.log(error))  
        }else {
            console.log('Nuevo registro')
            const url = import.meta.env.VITE_API_URL
            axios.post(url, valores)
            .then(res => {
                console.log(res.data)
                resetForm()
                navigate('/')
            })
            .catch(error => console.log(error))
        }
    }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{dataID?.nombre ? 'Editar Cliente' : 'Agregar cliente'}</h1>

        <Formik
        initialValues={{
            nombre: dataID?.nombre ?? '',
            empresa: dataID?.empresa ?? '',
            email: dataID?.email ?? '',
            telefono: dataID?.telefono ?? '',
            notas: dataID?.notas ?? ''
        }} 
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
            handleSubmit(values, resetForm)
        }}
        validationSchema={nuevoClienteSchema}
        >
            {({errors, touched}) => {
                return (
            <Form
            className='mt-10'
            >
                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='nombre'
                    >Nombre: </label>
                    <Field
                    id='nombre'
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-100'
                    placeholder='Nombre del Cliente'
                    name='nombre'
                    />

                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='empresa'
                    >Empresa: </label>
                    <Field
                    id='empresa'
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-100'
                    placeholder='Empresa del Cliente'
                    name='empresa'
                    />

                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='email'
                    >E-mail: </label>
                    <Field
                    id='email'
                    type='email'
                    className='mt-2 block w-full p-3 bg-gray-100'
                    placeholder='E-mail del Cliente'
                    name='email'
                    />

                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='telefono'
                    >Teléfono : </label>
                    <Field
                    id='telefono'
                    type='tel'
                    className='mt-2 block w-full p-3 bg-gray-100'
                    placeholder='Teléfono del Cliente'
                    name='telefono'
                    />

                    {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='notas'
                    >Notas: </label>
                    <Field
                    as='textarea'
                    id='notas'
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-100 h-40'
                    placeholder='Notas'
                    name='notas'
                    />
                </div>

                <input 
                type="submit" 
                value={dataID?.nombre ? 'Editar Cliente' : 'Agregar cliente'}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                />
            </Form>
            )}}
        </Formik>
        
    </div>
  )
}

Formulario.defaultProps = {
    dataID: {}
}

export default Formulario