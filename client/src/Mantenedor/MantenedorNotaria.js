import React, { Component } from 'react';

class MantenedorNotaria extends Component {
    constructor(props){
        super(props)

        this.state = {
            precio: 0,
            idDocumento: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){     
        this.setState({ idDocumento: event.target.value }) 
        this.GetPrecioDocumentoPorId()
    }

    GetPrecioDocumentoPorId(){
        let id = this.state.idDocumento
        let docs = this.props.documentos
        
        const resultado = docs.filter( (e) => e.id == id )
        console.log(resultado.precio)

        this.setState({ precio: resultado.precio })
    }
    
    render() {      
        
        return (
            
            <div className="col-lg-12">
                    
            <form>
            <div className="form-group">
                <label>Documento</label>
                <select className="form-control" onChange={this.handleChange} >
                    <option value={this.state.precio}
                            
                        >-- Seleccionar --</option>
                    { this.props.documentos.map((documento, key) => {
                        return(
                            <option key={key} value={documento.id}>{documento.nombre}</option>
                        )
                    } )}
                </select>
            </div>   
            <div className="form-group">
                <label>Precio por Emitir Documentoo</label>
                <input
                        id="txtPrecioPorEmision"
                        value="hola"
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

        )
    }
}

export default MantenedorNotaria