import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2';
const url = import.meta.env.VITE_BASE_URL;

export const Create = () => {

    const { form, changed } = useForm({});
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    const create = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        await axios.post(`${url}product/create`, form, config).then(
            (response) => {

                Swal.fire({
                    title: 'Producto Creado',
                    text: response.data.message,
                    icon: 'success'
                });

            }
        ).catch(
            (error) => {

                setMessage(error.response.data.message);

            }
        ).finally(
            () => {

                setSubmitting(false);
                document.getElementById('form').reset();

            }
        )

    }

    return (
        <div className="container mx-auto px-4 py-8">

            {message &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">{message}</strong>
                </div>
            }

            <h1 className="text-3xl text-center font-bold mb-4">Crear Nuevo Producto</h1>

            <div className="mt-8">
                <Link to="/haciendola">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Volver atrás
                    </button>
                </Link>
            </div>

            <form id='form' onSubmit={create} className="space-y-4">

                <div>
                    <label htmlFor="Handle" className="block font-medium text-gray-700">Handle</label>
                    <input
                        type="text"
                        id="Handle"
                        name="Handle"
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
                        onChange={changed}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
                    >
                        {submitting ? 'Creando Producto...' : 'Crear Producto'}
                    </button>
                </div>

            </form>

        </div>
    )
}
