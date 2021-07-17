import React, { Component } from 'react';

class DocumentosDestinatario extends Component {
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
        return (
            <div className="col-lg-6 mt-2">
                <h1>Historial Documentos Destinatario</h1>

                {this.props.documentosDestinatario.map((documento, key) => {
                    return (
                       
                            <form key={key} id={"notaria-"+ documento.id} onSubmit={(event) => {
                                event.preventDefault() 
                                const idDocumento = event.target.id.value 
                                
                                console.log(idDocumento)
                                this.props.aceptaDocumento(idDocumento)
                            }}>
                                <div className="mb-3">
                                    <label className="form-label">Documento</label>
                                    <input name="id" readOnly type="text" className="form-control" defaultValue={documento.id}  />                                    
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input readOnly type="text" className="form-control" defaultValue={documento.precio} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Destinatario</label>
                                    <input readOnly type="text" className="form-control" defaultValue={documento.destinatario} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <input readOnly type="text" className="form-control" defaultValue={this.retornaEstado(documento.estado)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input readOnly type="text" className="form-control" defaultValue={documento.documento.nombre} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input readOnly type="text" className="form-control" defaultValue={documento.documento.precio} />
                                </div>
                                                                                                                                                                                                    
                                    <button type="submit" className="btn btn-success">Aceptar Documento</button>
                                </form>
                            
                            )
                })}
                        </div>
                    )
                }
}

                export default DocumentosDestinatario