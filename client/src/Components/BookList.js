import React from 'react';

const BookList = ({book, setBook, books, setListUpdated}) => {


    const handleDelete = id => {
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        setListUpdated(true)
    }

    let{descripcion, ubicacion,inventario } = book
    const handleUpdate = id => {
        inventario = parseInt(inventario, 10)
        //validación de los datos
        if (descripcion === '' || ubicacion === '' || inventario <= 0 ) {
            alert('Todos los campos son obligatorios')
            return
        }
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))

        //reiniciando state de libro
        setBook({
            descripcion: '',
            ubicacion: '',
            inventario: 0
        })

        setListUpdated(true)
    }


    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descripticion</th>
                    <th>ubicacion</th>
                    <th>inventario</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.descripcion}</td>
                        <td>{book.ubicacion}</td>
                        <td>{book.inventario}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={() => handleDelete(book.id)} className="btn btn-danger">Delete</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={() => handleUpdate(book.id)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default BookList;