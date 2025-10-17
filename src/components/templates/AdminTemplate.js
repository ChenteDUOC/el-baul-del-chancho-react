import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../organisms/AdminSidebar';

function AdminTemplate() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2 p-0">
                    <AdminSidebar />
                </div>
                <main className="col-md-0 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminTemplate;