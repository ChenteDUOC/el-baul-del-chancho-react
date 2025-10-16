import React from 'react';
import FormularioLogin from '../components/organisms/FormularioLogin';

function LoginPage({ onLogin }) {
    return (
        <div className="d-flex flex-column min-vh-100">

            <main className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card p-4 p-md-5 shadow-sm">
                            <FormularioLogin onLogin={onLogin} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;