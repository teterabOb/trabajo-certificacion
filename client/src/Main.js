import React, { Component } from 'react';
import MantenedorNotaria from './Mantenedor/MantenedorNotaria';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            estado: 0
        };

        this.handleChange = this.handleChange.bind(this);        
    }

    handleChange(event) {
        this.setState({ estado: event.target.value })
        console.log(this.state.estado)
    }

    render() {

        let account = this.props.account
        let owner = this.props.owner

        if (account === owner) {
            return (
                <div className="col-lg-12" id="content">
                    <p>owner</p>

                    <div className="col-lg-6 mt-2">
                        <h1>Nuevo Documento</h1>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            const nombre = this.txtNombre.value
                            const precio = this.txtPrecio.value
                            const estado = this.state.estado
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
                                <select className="form-control"
                                    value={this.state.estado}
                                    onChange={this.handleChange}>

                                    <option value="0">Activo</option>
                                    <option value="1">Inactivo</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Agregar Documento </button>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="row mx-2" id="content">
                    <div className="col-lg-12">
                        <p>Cuenta actual: {account}</p>
                        <p>Owner: {owner}</p>
                    </div>

                    <div className="col-lg-6 mt-2">
                        <h1>Documentos Disponibles</h1>
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
                                {this.props.documentos.map((documento, key) => {
                                    if (documento.id > 0) {
                                        return (

                                            <tr key={key}>
                                                <td scope="row">{documento.id}</td>
                                                <td>{documento.nombre}</td>
                                                <td>{documento.precio} Ether</td>
                                                <td>{documento.estado === true ? 'Activo' : 'Inactivo'}</td>
                                                <td>
                                                    <button
                                                        name={documento.id}
                                                        value={documento.precio}
                                                        onClick={(event) => {
                                                            this.props.compraDocumento(event.target.name, event.target.value)
                                                        }}

                                                        className="btn btn-success btn-sm">
                                                        Generar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }

                                })}
                            </tbody>
                        </table>
                    </div>

                    <MantenedorNotaria 
                        documentos={this.props.documentos}
                        addDocumentoNotaria={this.props.addDocumentoNotaria} />
                </div>


            )
        }
    }
}

export default Main