import React from 'react';

function AreaDeTexto({ label, name, value, onChange }) {
    const id = `textarea-${name}`;

    return (
        <div className="form-floating mb-4">
            <textarea
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                style={{ height: '150px' }}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default AreaDeTexto;