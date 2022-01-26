import React from 'react';

const Form = ({book, setBook}) => {

    const handleChange = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }

    let{descripcion, inventario, ubicacion} = book

    const handleSubmit = () => {
        inventario = parseInt(inventario, 10)
        //validación de los datos
        if (descripcion === '' || ubicacion === '' || inventario <= 0 ) {
            alert('Todos los campos son obligatorios')
            return
        }

        //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }
        fetch('http://localhost:9000/api', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setBook({
            descripcion: '',
            ubicacion: '',
            inventario: 0
        })



    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">descripcion</label>
                <input value={descripcion} name="titulo" onChange={handleChange} type="text" id="title" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Ubicacion</label>
                <input value={ubicacion} name="autor" onChange={handleChange} type="text" id="author" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edition" className="form-label">inventario</label>
                <input value={inventario}  name="edicion" onChange={handleChange} type="number" id="edition" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
 
export default Form;