import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getComplaints} from '../../actions/complaintsActions';
import Complaints from '../Complaints/Complaints';
import CreateAdminFormDialog from "../Form/CreateAdminFormDialog";

const AdminHome = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getComplaints());
    }, [dispatch]);

    return (
        <>
            <div>
                {user.result.role === "superAdmin" && <CreateAdminFormDialog/>}
            </div>
            <div>
                <Complaints/>
            </div>
        </>
    );
};

export default AdminHome;
