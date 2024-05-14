import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Spinner } from '../Spinner';

export const PublicLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {

        return (

            <Spinner />

        )

    } else {

        return (
            <main>

                {!auth.id ? <Outlet /> : <Navigate to="/haciendola" />}
                
            </main>
        )

    }
    
}
