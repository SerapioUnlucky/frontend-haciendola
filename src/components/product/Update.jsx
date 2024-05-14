import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Spinner } from '../Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
const url = import.meta.env.VITE_BASE_URL;

export const Update = () => {

    const { form, changed } = useForm({});
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { handle } = useParams();

    useEffect(() => {

        getProduct();

    }, []);

    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    const getProduct = async () => {

        setLoading(true);

        await axios.get(`${url}product/view/${handle}`, config).then(
            (response) => {

                setProduct(response.data.product);

            }
        ).catch(
            () => {

                setRedirect(true);

            }
        ).finally(
            () => {

                setLoading(false);

            }
        )

    }

    const update = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        await axios.put(`${url}product/update/${handle}`, form, config).then(
            (response) => {

                Swal.fire({
                    title: 'Producto actualizado',
                    text: response.data.message,
                    icon: 'success'
                }).then(
                    () => {

                        setRedirect(true);

                    });

            }
        ).catch(
            (error) => {

                setMessage(error.response.data.message);

            }
        ).finally(
            () => {

                setSubmitting(false);

            }
        )

    }

    if (redirect) return <Navigate to="/haciendola" />

    return (
        <div className="container mx-auto px-4 py-8">

            {loading ? <Spinner /> :

                <>

                    {message &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">{message}</strong>
                        </div>
                    }

                    <h1 className="text-3xl text-center font-bold mb-4">Actualizar un Producto</h1>

                    <div className="mt-8">
                        <Link to="/haciendola">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                                Volver atrás
                            </button>
                        </Link>
                    </div>

                    <form onSubmit={update} className="space-y-4">

                        <div>
                            <label htmlFor="Handle" className="block font-medium text-gray-700">Handle</label>
                            <input
                                type="text"
                                id="Handle"
                                name="Handle"
                                defaultValue={product.Handle}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Title" className="block font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                id="Title"
                                name="Title"
                                defaultValue={product.Title}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Description" className="block font-medium text-gray-700">Descripción</label>
                            <textarea
                                id="Description"
                                name="Description"
                                defaultValue={product.Description}
                                onChange={changed}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="SKU" className="block font-medium text-gray-700">SKU</label>
                            <input
                                type="number"
                                id="SKU"
                                name="SKU"
                                defaultValue={product.SKU}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Grams" className="block font-medium text-gray-700">Gramos</label>
                            <input
                                type="number"
                                step="0.01"
                                id="Grams"
                                name="Grams"
                                defaultValue={product.Grams}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Stock" className="block font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                id="Stock"
                                name="Stock"
                                defaultValue={product.Stock}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Price" className="block font-medium text-gray-700">Precio</label>
                            <input
                                type="number"
                                id="Price"
                                name="Price"
                                defaultValue={product.Price}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="Compare_Price" className="block font-medium text-gray-700">Precio Comparado</label>
                            <input
                                type="number"
                                id="Compare_Price"
                                name="Compare_Price"
                                defaultValue={product.Compare_Price}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="Barcode" className="block font-medium text-gray-700">Código de Barras</label>
                            <input
                                type="number"
                                id="Barcode"
                                name="Barcode"
                                defaultValue={product.Barcode}
                                onChange={changed}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 border-yellow-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-200"
                            >
                                {submitting ? 'Actualizando Producto...' : 'Actualizar Producto'}
                            </button>
                        </div>

                    </form>

                </>

            }

        </div>
    )
}
