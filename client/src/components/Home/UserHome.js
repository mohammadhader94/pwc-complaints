import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getComplaintsByUserId} from '../../actions/complaintsActions';
import Complaints from '../Complaints/Complaints';
import ComplaintFormDialog from '../Form/ComplaintFormDialog';

const UserHome = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getComplaintsByUserId(user.result._id));
    }, [user.result._id, dispatch]);

    return (
        <>
            <div>
                <ComplaintFormDialog/>
            </div>
            <div>
                <Complaints/>
            </div>
        </>
    );
};

export default UserHome;
