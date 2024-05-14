import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layouts/PublicLayout';
import { PrivateLayout } from '../components/layouts/PrivateLayout';
import { Login } from '../components/Login';
import { ResetPassword } from '../components/ForgotPassword';
import { Register } from '../components/Register';
import { Home } from '../components/product/Home';
import { Create } from '../components/product/Create';
import { Update } from '../components/product/Update';
import { Logout } from '../components/Logout';

export const Routing = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<PublicLayout />} >

                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />

                </Route>

                <Route path='/haciendola' element={<PrivateLayout />}>

                    <Route index element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='create' element={<Create />} />
                    <Route path='update/:handle' element={<Update />} />
                    <Route path='logout' element={<Logout />} />

                </Route>

                <Route path='forgot-password/:username' element={<ResetPassword />} />

            </Routes>

        </BrowserRouter>

    )

};
