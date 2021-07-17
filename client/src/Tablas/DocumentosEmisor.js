import React, { Component } from 'react';

class DocumentosEmisor extends Component {
    constructor(props) {
        super(props)
    }

    retornaEstado(idEstado) {
        let estado
        switch (idEstado) {
            case "0":
                estado = "Abierto"
                break;
            case "1":
                estado = "Aceptado"
                break;
            case "2":
                estado = "Finalizado"
                break;
        }
        return estado
    }

    render() {
        const cantDocumentos = this.props.documentosEmisor.length
        return (
            <div className="col-lg-12 mt-2">
                <h1>Historial Documentos Emitidos</h1>

                {this.props.documentosEmisor.map((documento, key) => {
                    return (
                        <li key={key}>ID: {documento.id} - 
                                        Precio: {documento.precio} -  
                                        Destinatario: {documento.destinatario} - 
                                        Estado: {this.retornaEstado(documento.estado)} -
                                        Documento: {documento.documento}
                        </li>
                    )
                })}
            </div>
        )
    }
}

export default DocumentosEmisor