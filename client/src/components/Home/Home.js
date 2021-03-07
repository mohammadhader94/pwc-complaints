import React from 'react';

import UserHome from './UserHome';
import AdminHome from './AdminHome';
import Auth from "../Auth/Auth";

const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user) {
        return <Auth/>;
    }
    const isAdmin = user?.result?.role?.toLowerCase().includes("admin");

    return (
        isAdmin ? <AdminHome/> : <UserHome/>
    );
};

export default Home;
