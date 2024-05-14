import { useState } from "react";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_BASE_URL;

export const ResetPassword = () => {

    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { form, changed } = useForm({});
    const { username } = useParams();

    const resetPassword = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        await axios.put(`${url}user/forgot-password/${username}`, form).then(
            (response) => {

                setMessage('');
                Swal.fire(
                    'Contraseña restablecida',
                    response.data.message,
                    'success'
                ).then(
                    () => {

                        setRedirect(true);

                    }
                )

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

    if (redirect) return <Navigate to="/login" />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8">

                {message &&

                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{message}</strong>
                    </div>

                }

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Restablecer contraseña</h2>
                </div>

                <form id="form" className="mt-8 space-y-6" onSubmit={resetPassword}>

                    <div className="rounded-md shadow-sm -space-y-px">

                        <div>
                            <label htmlFor="newPassword" className="sr-only">Nueva Contraseña</label>
                            <input id="newPassword" name="newPassword" onChange={changed} type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nueva Contraseña" />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
                            <input id="confirmPassword" name="confirmPassword" onChange={changed} type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirmar Contraseña" />
                        </div>

                    </div>

                    <div>
                        <button type="submit" disabled={submitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {submitting ? 'Restableciendo contraseña...' : 'Restablecer contraseña'}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};
