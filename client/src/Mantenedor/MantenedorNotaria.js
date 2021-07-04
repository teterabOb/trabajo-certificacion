import React, { Component, useState } from 'react';

class MantenedorNotaria extends Component {
    constructor(props) {
        super(props)

        this.state = {
            precio: 0,
            idDocumento: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ idDocumento: event.target.value })
        console.log(this.props.documentos)
        const resultado = this.props.documentos.filter((e) => e.id == this.state.idDocumento)
        if (resultado.length > 0) {
            this.setState({ precio: resultado[0].precio })
        }
    }

    render() {

        return (

            <div className="col-lg-12 row">
                {this.props.documentos.map((documento, key) => {
                    return (
                        
                            <form key={key} onSubmit={(event) => {
                                event.preventDefault()
                                const idDocumento = this.idDocumento
                                const destinatario = this.txtAddressDestinatario.value
                                const precio = this.txtPrecioAcordado.value

                                console.log(idDocumento)
                                console.log(destinatario)
                                console.log(precio)
                            }}>
                                <div className="card border-primary mb-3" >
                                    <div className="card-header bg-primary text-white" ref={this.idDocumento = documento.id}>{documento.id} # {documento.nombre}</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title">Precio realización trámite {documento.precio} ETH </h5>
                                        <p>                                    
                                        <input
                                            id="txtAddressDestinatario"
                                            type="text"
                                            ref={(input) => { this.txtAddressDestinatario = input }}
                                            className="form-control"
                                            placeholder="Dirección Destinatario"
                                            required />
                                        </p>
                                        <p>                                    
                                        <input
                                            id="txtPrecioAcordado"
                                            type="text"
                                            ref={(input) => { this.txtPrecioAcordado = input }}
                                            className="form-control"
                                            placeholder="Monto"
                                            required />
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent border-primary d-flex justify-content-center">
                                        <button className="btn btn-warning mx-2">Habilitar Documento</button>
                                        <button className="btn btn-primary mx-2" type="submit">Generar Documento</button>
                                    </div>
                                </div>
                            </form>
    


                    )
                })}
                <div className="col-lg-12">
                    <form>
                        <div className="form-group">
                            <label>Documento</label>
                            <select className="form-control" onChange={this.handleChange} >
                                {this.props.documentos.map((documento, key) => {
                                    return (
                                        <option key={key} value={documento.id}>{documento.nombre}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Precio por Emitir Documentoo</label>
                            <input
                                id="txtPrecioPorEmision"
                                value={this.state.precio + " ETH"}
                                type="text"
                                readOnly={true}
                                className="form-control"
                                placeholder="Precio por Emisión"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Precio</label>
                            <input
                                id="txtEstado"
                                type="text"
                                ref={(input) => { this.txtprecio = input }}
                                className="form-control"
                                placeholder="Precio"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Cuenta Destinatario</label>
                            <input
                                id="txtEstado"
                                type="text"
                                ref={(input) => { this.txtCuentaDestinatario = input }}
                                className="form-control"
                                placeholder="Destinatario"
                                required />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Generar Documento</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default MantenedorNotaria