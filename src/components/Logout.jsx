import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Spinner } from "./Spinner";

export const Logout = () => {

    const { setAuth } = useAuth();

    useEffect(() => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({});

        <Navigate to="/login" />

    })

    return (

        <Spinner />
        
    )

}
