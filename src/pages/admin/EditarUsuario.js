import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormularioRegistro from '../../components/organisms/FormularioRegistro';

function EditarUsuario({ usuarios, onUpdate}) {
    const { email } = useParams(); // Obtiene el email de la URL
    const navigate = useNavigate();

    // Estado para guardar los datos del formulario
    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        // Buscamos al usuario 
        const usuarioAEditar = usuarios.find(u => u.email === email);
        if (usuarioAEditar) {
            setDatosUsuario(usuarioAEditar);
        } else {
            //Si no se encuentra al usuario, redirigimos
            navigate('/admin/usuarios');
        }
    }, [usuarios, email, navigate]);

    const handleUpdate = (formData) => {
        onUpdate(formData);
    };

    // Mensaje de carga al buscar datos
    if (!datosUsuario) {
        return <div>Cargando datos del usuario...</div>
    }

    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wwrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Editando a: {datosUsuario.nombre}</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <FormularioRegistro
                        onRegister={handleUpdate}
                        showRoleSelector={true}
                        initialData={datosUsuario}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;