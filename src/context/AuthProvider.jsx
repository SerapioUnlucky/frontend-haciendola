import { useState, useEffect, createContext } from "react";
import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        authUser();

    }, []);

    const authUser = async () => {

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {

            setLoading(false);
            return;

        }

        const config = {
            headers: {
                Authorization: token
            }
        }

        const userObj = JSON.parse(user);
        const userId = userObj.id;

        await axios.get(`${url}user/profile/${userId}`, config).then(
            (response) => {

                setAuth(response.data.user);
                setLoading(false);

            }
        ).catch(
            () => {

                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setAuth({});
                setLoading(false);

            }
        )

    }

    return (
        <AuthContext.Provider value={{ auth, loading, setAuth }}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContext;
