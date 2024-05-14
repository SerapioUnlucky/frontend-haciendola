import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Spinner } from '../Spinner';
import { Header } from '../Header';

export const PrivateLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {

        return (

            <Spinner />

        )

    } else {

        return (

            <>

                <Header />

                <main>

                    {auth.id ? <Outlet /> : <Navigate to="/login" />}

                </main>

            </>
        )

    }

}
