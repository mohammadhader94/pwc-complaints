import React from 'react';
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
import Complaint from "../Complaints/Complaint/Complaint";
import {useSelector} from "react-redux";
import StatusUpdate from "./Complaint/StatusUpdate";


const columns = [
    {field: 'title', title: 'Title'},
    {field: 'creatorName', title: 'Creator Name'},
    {
        field: 'dateOfIncidence', title: 'Date', render: rowData =>
            <div>
                {new Date(rowData.dateOfIncidence).toLocaleDateString("en-US")}

            </div>
    },
    {
        field: 'applicableCategories',
        title: 'Categories',
        render: rowData =>
            <div>
                {rowData.applicableCategories.map((category, index) => {
                    return (
                        <Chip key={index} label={category}/>
                    )
                })}

            </div>
    },
    {
        field: 'status', title: 'Status', render: rowData => {
            if (rowData.status === "Dismissed") {
                return <Chip label="Dismissed" color="secondary"/>
            } else if (rowData.status === "Resolved") {
                return <Chip label="Resolved" color="primary"/>
            } else {
                return <Chip label="Pending"/>
            }
        }
    },
    {
        field: 'complaint',
        title: 'View Complaint',
        render: rowData =>
            <div>
                {<Complaint complaintData={rowData}/>}
            </div>
    }

];


const Complaints = () => {
    const complaints = useSelector((state) => state.complaints);
    const user = JSON.parse(localStorage.getItem('profile'));
    const isAdmin = user?.result?.role?.toLowerCase().includes("admin");
    if (isAdmin) {
        if (!columns.find(col => col.field === "updateStatus")) {
            columns.push({
                field: 'updateStatus',
                title: 'Update Status',
                render: rowData =>
                    <div>
                        {<StatusUpdate complaintData={rowData}/>}
                    </div>
            })
        }

    }

    return (
        <>
            <div style={{width: '100%'}}>
                <MaterialTable
                    options={{
                        actionsColumnIndex: -1
                    }}
                    columns={columns}
                    data={complaints}
                    title="My Complaints"
                />
            </div>
        </>

    )
};
export default Complaints;
