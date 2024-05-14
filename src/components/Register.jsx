import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const url = import.meta.env.VITE_BASE_URL;

export const Register = () => {
    
    const { form, changed } = useForm({});
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const register = async (e) => {

        e.preventDefault();

        await axios.post(`${url}user/register`, form).then(
            (response) => {

                setMessage('');
                Swal.fire(
                    'Registrado',
                    response.data.message,
                    'success'
                );

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8">

                {message &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{message}</strong>
                    </div>
                }

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrarse</h2>
                </div>

                <form id='form' className="mt-8 space-y-6" onSubmit={register}>

                    <div className="rounded-md shadow-sm -space-y-px">

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="firstname" className="sr-only">Nombre</label>
                                <input id="firstname" name="firstname" onChange={changed} type="text" autoComplete="given-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nombre" />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="sr-only">Apellido</label>
                                <input id="lastname" name="lastname" onChange={changed} type="text" autoComplete="family-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Apellido" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="sr-only">Nombre de usuario</label>
                            <input id="username" name="username" onChange={changed} type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nombre de usuario" />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" onChange={changed} type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>

                    </div>

                    <div>
                        <button type="submit" disabled={submitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {submitting ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>

                </form>

                <div className="text-center">

                    <p className="mt-2 text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Inicia sesión
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};
