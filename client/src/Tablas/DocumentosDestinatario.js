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

    retornaHola(idEstado){
        console.log("estado " + idEstado)

        if(idEstado === '0'){
            return "<button type='submit' className='btn btn-success'>Aceptar Documento</button>"
        }
        else if(idEstado === '1'){
            return "<button type='submit' className='btn btn-warni'>Aceptar Finalizar</button>"
        }
        else if(idEstado === '2'){
            return "<button type='submit' className='btn btn-danger'>Documento Finalizado</button>"
        }
        else{
            return "No funciona"
        }        
    }

    execDocumento(idDocumento, idEstado){


        if(idEstado == 0){
            this.props.aceptaDocumento(idDocumento)
        }
        else if(idEstado == 1){
            this.props.finalizaDocumento(idDocumento)
        }
    }

    render() {
        return (
            <div className="col-lg-12 d-flex justify-content-left my-5">
                

                {this.props.documentosDestinatario.map((documento, key) => {
                    return (
                        <div className="col-lg-2" key={key}>
                            <form id={"notaria-" + documento.id} onSubmit={(event) => {
                                event.preventDefault()
                                const idDocumento = event.target.id.value
                                const idEstado = documento.estado
                                this.execDocumento(idDocumento, idEstado)
                                
                            }}>
                                <div className="mb-3">
                                    <label className="form-label">Documento</label>
                                    <input name="id" readOnly type="text" className="form-control" defaultValue={documento.id} />
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
                            </div>
                    )
                })}
            </div>
        )
    }
}

export default DocumentosDestinatario