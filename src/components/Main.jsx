import React from 'react'
import { nanoid } from 'nanoid'
import { firebase } from '../firebase'

const Main = () => {
    const [carrera, setCarrera] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [tiempo_estudio, setTiempoEstudio] = React.useState('')
    const [materias, setMaterias] = React.useState('')
    const [dificultad, setDificultad] = React.useState([])
    const [imagenAleatoria, setImagenAleatoria] = React.useState([])
    const [listaCarreras, setListaCarreras] = React.useState([])
    const [id, setId] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('carreras').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))
                setListaCarreras(arrayData)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos();
    })


    const guardarCarreras = async (e) => {
        e.preventDefault()

        if (!carrera.trim()) {
            setError('Digite la carrera')
            return
        }
        if (!descripcion.trim()) {
            setError('Digite la descripción')
            return
        }
        if (!tiempo_estudio.trim()) {
            setError('Digite el tiempo de estudio')
            return
        }

        if (!materias.trim()) {
            setError('Digite las materias')
            return
        }
        if (!dificultad.trim()) {
            setError('Digite la dificultad')
            return
        }

        try {
            const db = firebase.firestore()
            const nuevaCarrera = {
                carrera: carrera,
                descripcion: descripcion,
                tiempo_estudio: tiempo_estudio,
                materias: materias,
                dificultad: dificultad,
                img: imagenAleatoria
            }

            await db.collection('carreras').add(nuevaCarrera)

            setListaCarreras([
                ...listaCarreras,
                {
                    id: nanoid(),
                    carrera: carrera,
                    descripcion: descripcion,
                    tiempo_estudio: tiempo_estudio,
                    materias: materias,
                    dificultad: dificultad,
                    img: imagenAleatoria
                }
            ])

            e.target.reset()
            setCarrera('')
            setDescripcion('')
            setTiempoEstudio('')
            setMaterias('')
            setDificultad('')
            setError(null)
        } catch (error) {
            console.log(error)
        }

    }

    const editar = item => {
        setCarrera(item.carrera)
        setDescripcion(item.descripcion)
        setTiempoEstudio(item.tiempo_estudio)
        setMaterias(item.materias)
        setDificultad(item.dificultad)
        setModoEdicion(true)
        setId(item.id)
    }
    const editarCarreras = async e => {
        e.preventDefault()

        if (!carrera.trim()) {
            setError('Digite la carrera')
            return
        }
        if (!descripcion.trim()) {
            setError('Digite la descripción')
            return
        }
        if (!tiempo_estudio.trim()) {
            setError('Digite el tiempo de estudio')
            return
        }
        if (!materias.trim()) {
            setError('Digite las materias')
            return
        }
        if (!dificultad.trim()) {
            setError('Digite la dificultad')
            return
        }

        try {
            const db = firebase.firestore()
            await db.collection('carreras').doc(id).update({
                carrera: carrera,
                descripcion: descripcion,
                tiempo_estudio: tiempo_estudio,
                materias: materias,
                dificultad: dificultad
            })
            const arrayEditado = listaCarreras.map(
                item => item.id === id ? {
                    id: id, carrera: carrera,
                    descripcion: descripcion,
                    tiempo_estudio: tiempo_estudio,
                    materias: materias,
                    dificultad: dificultad
                } : item
            )

            setListaCarreras(arrayEditado)
            setCarrera('')
            setDescripcion('')
            setTiempoEstudio('')
            setMaterias('')
            setDificultad('')
            setModoEdicion(false)
            setError(null)

        } catch (error) {
            console.log(error)
        }

    }
    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('carreras').doc(id).delete()
            const aux = listaCarreras.filter(item => item.id !== id)
            setListaCarreras(aux)
        } catch (error) {
            console.log(error)
        }


    }

    const cancelar = () => {
        setModoEdicion(false)
        setCarrera('')
        setDescripcion('')
        setTiempoEstudio('')
        setMaterias('')
        setDificultad('')
        setId('')
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD CARRERAS UNIVERSITARIAS</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de carreras universitarias</h4>
                    <ul className='list-group'>
                        {
                            listaCarreras.map(item => (

                                <table className="table table-striped" key={item.id}>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col-4">Carrera</th>
                                            <th scope="col-4">Descripción</th>
                                            <th scope="col-4">Tiempo de estudio</th>
                                            <th scope="col-4">Materias</th>
                                            <th scope="col-4">Dificultad</th>
                                            <th scope="col-4">Imagen aleatoria</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row-4">{item.carrera}</td>
                                            <td scope="row-4"> {item.descripcion}</td>
                                            <td scope="row-4">{item.tiempo_estudio}</td>
                                            <td scope="row-4">{item.materias}</td>
                                            <td scope="row-4">{item.dificultad}</td>
                                            <td scope="row-4"><img
                                                alt={item.carrera}
                                                src={`https://picsum.photos/200/200?random&t=${item.id}`}
                                            /></td>
                                            <td>       <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>
                                                Eliminar
                                            </button>
                                                <button className='btn btn-warning btn-sm float-end mx-2' onClick={() => editar(item)}>
                                                    Editar
                                                </button></td>
                                        </tr>
                                    </tbody>
                                </table>


                            ))
                        }
                    </ul>

                </div>
                <div className='col-3'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Carreras' : 'Agregar Carreras'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarCarreras : guardarCarreras}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese carrera'
                            onChange={(e) => setCarrera(e.target.value)}
                            value={carrera}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese descripción'
                            type="text"
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese tiempo de estudio'
                            type="text"
                            onChange={(e) => setTiempoEstudio(e.target.value)}
                            value={tiempo_estudio}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese materias'
                            type="text"
                            onChange={(e) => setMaterias(e.target.value)}
                            value={materias}
                        />

                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese dificultad'
                            type="text"
                            onChange={(e) => setDificultad(e.target.value)}
                            value={dificultad}
                        />
                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className='btn btn-warning btn-block'
                                            type='submit'
                                        >Editar</button>
                                        <button
                                            className='btn btn-dark btn-block mx-2'
                                            onClick={() => cancelar()}
                                        >Cancelar</button>
                                    </>
                                )
                                :

                                <button
                                    className='btn btn-primary btn-block'
                                    type='submit'
                                >Agregar</button>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main