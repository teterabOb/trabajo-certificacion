import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div className="row" id="content">
                <div className="col-lg-6">
                <h1>Nuevo Documento</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const nombre = this.txtNombre.value
                    const precio = this.txtPrecio.value                    
                    const estado = this.txtEstado.value
                    this.props.nuevoDocumento(precio, nombre, estado)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="txtNombre"
                            type="text"
                            ref={(input) => { this.txtNombre = input }}
                            className="form-control"
                            placeholder="Nombre Documento"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="txtPrecio"
                            type="text"
                            ref={(input) => { this.txtPrecio = input }}
                            className="form-control"
                            placeholder="Precio Documento"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="txtEstado"
                            type="text"
                            ref={(input) => { this.txtEstado = input }}
                            className="form-control"
                            placeholder="Estado"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar Documento</button>
                </form>
                </div>



                <div className="col-lg-6">
                <h1>Nueva Region</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const add = this.direccion.value
                    const nombreRegion = this.NombreRegion.value
                    this.props.nuevaRegion(add, nombreRegion)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="direccion"
                            type="text"
                            ref={(input) => { this.direccion = input }}
                            className="form-control"
                            placeholder="Dirección"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="NombreRegion"
                            type="text"
                            ref={(input) => { this.NombreRegion = input }}
                            className="form-control"
                            placeholder="Nombre Region"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Agregar Región</button>
                </form>

                </div>


                <p></p>
                <h1>Utilizar Presupuesto</h1>
                <div className="col-lg-12 mt-2"></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Direccion</th> 
                            <th scope="col"></th>                            
                        </tr>
                    </thead>
                    <tbody id="regionesList">
                        { this.props.regiones.map((region, key) => {
                            if(region.id > 0)
                            {
                                return(
                                
                                    <tr key={key}>
                                        <td scope="row">{ region.id}</td>
                                        <td>{region.nombre}</td>
                                        <td>{region.direccionGobRegional}</td>
                                        <td>
                                            <button 
                                                

                                                className="btn btn-success btn-sm">
                                                    Comprar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }                            
                        }) }

                    </tbody>
                </table>

                <h1>Documentos</h1>
                <div className="col-lg-12 mt-2"></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th> 
                            <th scope="col">Estado</th>                            
                            <th scope="col"></th>                            
                        </tr>
                    </thead>
                    <tbody id="regionesList">
                        { this.props.documentos.map((documento, key) => {
                            if(documento.id > 0)
                            {
                                return(
                                
                                    <tr key={key}>
                                        <td scope="row">{ documento.id }</td>
                                        <td>{documento.nombre}</td>
                                        <td>{documento.precio} Ether</td>
                                        <td>{ documento.estado == true ? 'Activo' : 'Inactivo' }</td>
                                        <td>
                                            <button 
                                                name={documento.id}
                                                value={documento.precio}
                                                onClick={(event) => {
                                                    this.props.compraDocumento(event.target.name, event.target.value)
                                                }}  

                                                className="btn btn-success btn-sm">
                                                    Comprar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }                            
                        }) }

                    </tbody>
                </table>
            </div>

        )

    }
}

export default Main