import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';
const url = import.meta.env.VITE_BASE_URL;

export const Login = () => {

    const { setAuth } = useAuth();
    const { form, changed } = useForm({});
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState('');

    const login = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        await axios.post(`${url}user/login`, form).then(
            (response) => {

                setMessage('')
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setAuth(response.data.user);

                <Navigate to="/haciendola" />

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

    const resetPassword = async () => {

        const { value: username, dismiss: dismissReason } = await Swal.fire({
            title: 'Restablecer contraseña',
            input: 'text',
            inputLabel: 'Nombre de usuario',
            inputPlaceholder: 'Ingrese su nombre de usuario',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe ingresar un nombre de usuario';
                }
            }
        });

        if (username && dismissReason !== Swal.DismissReason.cancel) {

            setUsername(username);

        }

    }

    if (username) return <Navigate to={`/forgot-password/${username}`} />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                {message &&

                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{message}</strong>
                    </div>

                }

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={login}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Nombre de usuario</label>
                            <input id="username" name="username" onChange={changed} type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nombre de usuario" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" onChange={changed} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                    </div>

                    <div className="text-sm">
                        <button onClick={resetPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <div>
                        <button type="submit" disabled={submitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {submitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
