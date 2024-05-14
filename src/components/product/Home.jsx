import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../Spinner';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
const url = import.meta.env.VITE_BASE_URL;

export const Home = () => {

    const [products, setProducts] = useState([]);
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        getProducts();

    }, [page])

    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    const getProducts = async () => {

        setLoading(true);

        await axios.get(`${url}product/view-all/${page}`, config).then(
            (response) => {

                setProducts(response.data.products);
                setPage(response.data.page);
                setTotalPages(response.data.totalPages);

            }
        ).catch(
            (error) => {

                console.log(error);

            }
        ).finally(
            () => {

                setLoading(false);

            }
        )

    }

    const deleteProduct = async (handle) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`${url}product/delete/${handle}`, config).then(
                    (response) => {

                        Swal.fire(
                            '¡Eliminado!',
                            response.data.message,
                            'success'
                        )

                        getProducts();

                    }
                ).catch(
                    (error) => {

                        Swal.fire(
                            '¡Error!',
                            error.response.data.message,
                            'error'
                        )

                    }
                )

            }
        })

    }

    return (
        <div className="container mx-auto px-4 py-8">

            {loading ? <Spinner /> :

                <>

                    <h1 className="text-3xl font-bold text-center animate-pulse underline mt-8">Bienvenido {auth.username}</h1>

                    <div className="mt-8">
                        <Link to="/haciendola/create">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                                Registrar Nuevo Producto
                            </button>
                        </Link>
                    </div>

                    {products.length === 0 ? <h1 className="text-3xl text-center font-bold">No hay productos registrados</h1> :

                        <>

                            <h1 className="text-3xl font-bold mb-4">Lista de Productos</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {products.map((product, index) => (
                                    <div key={index} className="border border-gray-300 p-4 rounded mb-4">
                                        <h2 className="text-xl font-bold">{product.Title}</h2>
                                        <p className="text-gray-600">{product.Description}</p>
                                        <ul className="mt-2">
                                            <li><strong>SKU:</strong> {product.SKU}</li>
                                            <li><strong>Gramos:</strong> {product.Grams}</li>
                                            <li><strong>Stock:</strong> {product.Stock}</li>
                                            <li><strong>Precio:</strong> ${product.Price}</li>
                                            <li><strong>Precio Comparado:</strong> ${product.Compare_Price}</li>
                                            <li><strong>Código de Barras:</strong> {product.Barcode}</li>
                                        </ul>
                                        <div className="mt-4 flex justify-end">
                                            <Link to={`/haciendola/update/${product.Handle}`}>
                                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                    Editar
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteProduct(product.Handle)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">

                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Anterior
                                </button>

                                <span>Página {page} de {totalPages}</span>

                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Siguiente
                                </button>
                                
                            </div>

                        </>

                    }

                </>

            }

        </div>
    )
}
