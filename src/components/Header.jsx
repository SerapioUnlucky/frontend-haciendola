import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import img from '../assets/company.jpg';

export const Header = () => {

    const { auth } = useAuth();

    return (
        <header className="bg-gray-800 text-white py-4">

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">

                <div className="flex items-center mb-4 lg:mb-0">
                    <img src={img} alt='company' className="w-20" />
                </div>

                <div className='flex flex-col items-center gap-2'>

                    <Link to="/haciendola/logout">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200">
                            Cerrar Sesión
                        </button>
                    </Link>

                    <Link to={`/forgot-password/${auth.username}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-200">
                            Editar contraseña
                        </button>
                    </Link>

                </div>

            </div>

        </header>
    );

};
