import React, { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import SelectorFormulario from '../molecules/SelectorFormulario';
import AreaDeTexto from '../molecules/AreaDeTexto';

const categoriasProducto = ["Fiesta", "Estrategia", "Competitivo", "Deportivo", "Casuales", "Otros"];

function FormularioProducto({ onCreate, initialData = null }) {
    const [codigo, setCodigo] = useState(initialData?.codigo || '');
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [precio, setPrecio] = useState(initialData?.precio ||'');
    const [stock, setStock] = useState(initialData?.stock || '');
    const [categoria, setCategoria] = useState(initialData?.categoria || '');
    const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
    const [urlImagen, setUrlImagen] = useState(initialData?.urlImagen || '');
    const [stockCritico, setStockCritico] = useState(initialData?.stockCritico || '');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!codigo || !nombre || !precio || !stock || !categoria) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const productoActualizado = {
            codigo, // Usaremos el código como ID
            nombre,
            precio: parseFloat(precio), // convertimos el precio a número
            stock: parseInt(stock), // convertimos el stock a número
            categoria,
            descripcion,
            urlImagen,
            stockCritico: parseInt(stockCritico) || 0 // si no se rellana, por defecto es 0
        };

        onCreate(productoActualizado);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario
                        label="Código del Producto"
                        name="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        disabled={!!initialData}
                    />
                </div>

                <div className="col-md-6">
                    <CampoFormulario
                        label="Nombre del Producto"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario
                        label="Precio"
                        name="precio"
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <CampoFormulario
                    label="Stock"
                    name="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                </div>
            </div>
      
            <SelectorFormulario
                label="Categoría"
                name="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                options={categoriasProducto}
            />
      
            <AreaDeTexto
                label="Descripción (Opcional)"
                name="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
      
            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario
                        label="URL de Imagen (Opcional)"
                        name="urlImagen"
                        value={urlImagen}
                        onChange={(e) => setUrlImagen(e.target.value)}
                        placeholder="Ej: /images/producto.jpg"
                        isRequired={false}
                    />
                </div>
                <div className="col-md-6">
                    <CampoFormulario
                        label="Stock Crítico (Opcional)"
                        name="stockCritico"
                        type="number"
                        value={stockCritico}
                        onChange={(e) => setStockCritico(e.target.value)}
                        placeholder="Ej: 5"
                        isRequired={false}
                    />
                </div>
            </div>

            <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary btn-lg">
                    {initialData ? 'Guardar Cambios' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    );
}

export default FormularioProducto;