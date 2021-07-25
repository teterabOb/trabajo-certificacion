import React, { Component } from "react";
import PresupuestoContract from "./contracts/Presupuesto.json";
import TokenReceiver from "./contracts/TokenReceiver.json";
import NotariaContract from "./contracts/Notaria.json";
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',      
      documentos: [],
      documentosPorCliente: [],
      documentosEmisor: [],
      documentosDestinatario: [],
      montoAutorizado: 0,
      loading: true,
      owner: "0x0000000000000000000000000000000000000000",
      cantToken: 0

    }

    //Se debe bindear para que react sepa que al enviar la funcion
    // al otro js esta siendo la funcion ya creada

    this.nuevoDocumento = this.nuevoDocumento.bind(this)
    this.compraDocumento = this.compraDocumento.bind(this)
    this.addDocumentoNotaria = this.addDocumentoNotaria.bind(this)
    this.aceptaDocumento = this.aceptaDocumento.bind(this)
    this.finalizaDocumento = this.finalizaDocumento.bind(this)
    
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadWeb3() {
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

      await window.web3.currentProvider.on('accountsChanged', (accounts) => {
            
          this.setState({
              account: accounts[0]
              
          }, () => {         
              
          })

          this.loadBlockChainData()
      });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)

    }
    else {
      
    }
    
  }

  setDefaultVariables(){
    this.setState({ documentos: [] })
    this.setState({ documentosPorCliente: [] })
    this.setState({ documentosEmisor: [] })
    this.setState({ documentosDestinatario: [] })
  }

  async loadBlockChainData() {
    const web3 = window.web3

    
    //Carga cuenta
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId();

    const networkDataPresupuesto = PresupuestoContract.networks[networkId]
    const networkDataNotaria = NotariaContract.networks[networkId]


    if (networkDataNotaria) {
      
      //Limpia los documentos cliente
      this.setDefaultVariables();

      const presupuesto = new web3.eth.Contract(PresupuestoContract.abi, networkDataPresupuesto.address);
      const notaria = new web3.eth.Contract(NotariaContract.abi, networkDataNotaria.address);
      const tokenReceiver = new web3.eth.Contract(TokenReceiver.abi, networkDataNotaria.address);

      this.setState({ presupuesto, notaria })
      //Las funciones call leen data
      const regionesCount = await presupuesto.methods.RegionCount().call()
      const documentosCount = await notaria.methods.documentsCount().call()
      const owner = await notaria.methods.GetOwner().call()

  

      this.setState({ regionesCount, documentosCount, owner: owner })      
      
    
      const totalDocumentosEmisor = await notaria.methods.totalDocumentosEmisor(this.state.account).call()      
      const totalDocumentosDestinatario = await notaria.methods.totalDocumentosDestinatario(this.state.account).call()      




      //Documentos Emisor
      for(var a = 1; a <= totalDocumentosEmisor; a++){
        const doc = await notaria.methods.documentosNotariaEmisor(this.state.account, a).call()        
        this.setState({
          documentosEmisor: [...this.state.documentosEmisor, doc ]
       })
      }

      //Documentos Destinatario
      for(var b = 1; b <= totalDocumentosDestinatario; b++){
        const doc = await notaria.methods.documentosNotariaDestinatario(this.state.account, b).call()        
        this.setState({
          documentosDestinatario: [...this.state.documentosDestinatario, doc ]
       })
      }
      
      //Arreglo para listas documentos
      for(var j = 1; j <= documentosCount; j++){   
           const documento = await notaria.methods.documentos(j).call()
           this.setState({             
              documentos: [...this.state.documentos, documento]
           })           
      }

      const cantToken = await notaria.methods.balanceOf(this.state.account).call() 
      if(cantToken > 0) { this.setState({ cantToken: cantToken}) }  

      this.setState({ loading: false })


      
    } else {
        this.setState({ loading: false })
        this.setDefaultVariables()      
    }
  }

  nuevoDocumento(precio, nombre, estado) {

    this.setState({ loading: true })
    this.state.notaria.methods.AddDocumento(precio, nombre, estado).send({ from: this.state.account })
    //recibo de la transaccion desde la blockchain
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      });
  }

  async compraDocumento(id, precio) {

    this.setState({ loading: true })
    await this.state.notaria.methods.compraDocumento(id).send({ from: this.state.account, value: precio })
    //recibo de la transaccion desde la blockchain
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      });
  }

  async aceptaDocumento(id){
    await this.state.notaria.methods.AceptaDocumentoNotaria(id).send({ from: this.state.account, value: 2000000000000000000 })
    .on('error', (error) => {
      console.log('error')
      console.log(error)
    })
    .once('receipt', (receipt) => {
      console.log('once')
      this.setState({ loading: false })
      console.log(receipt)
    })

    .then((receipt) => {
      console.log('then')
      console.log(receipt)

    });
  }

  async finalizaDocumento(id){
    await this.state.notaria.methods.FinalizaDocumentoNotaria(id).send({ from: this.state.account, value: 2000000000000000000 })
    .on('error', (error) => {
      console.log('error')
      console.log(error)
    })
    .once('receipt', (receipt) => {
      console.log('once')
      this.setState({ loading: false })
      console.log(receipt)
    })

    .then((receipt) => {
      console.log('then')
      console.log(receipt)

    });
  }

  async addDocumentoNotaria(id, precio, destinatario){
    this.setState({ loading: true })
    console.log("id " + id, "precio " + precio,"destinatario " +  destinatario)

    await this.state.notaria.methods.AddDocumentoNotaria(id, precio, destinatario).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log('receipt')
      this.setState({ loading: false })
      console.log(receipt)
    })
    .on('confirmation', (confNumber, receipt, latestBlockHash) => {
      console.log('confirmacion')
      console.log(confNumber)
      console.log(receipt)
      console.log(latestBlockHash)
    })
    .on('error', (error) => {
      console.log('error')
      console.log(error)
    })
    .then((receipt) => {
      console.log(receipt)

    });

  }

  render() {

    return (
      <div className="bg-light">
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div classname="row">
            <div className="col-lg-12">
              <p>Precio: ETH</p>
            </div>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading  
                ? <div className="spinner-grow" role="status">
                  <span className="sr-only">Loading...</span></div> 
                : <Main  
                    regiones={ this.state.regiones } 
                    owner={ this.state.owner } 
                    account={ this.state.account } 
                    documentos={ this.state.documentos }
                    documentosPorCliente={ this.state.documentosPorCliente}
                    documentosEmisor ={ this.state.documentosEmisor}
                    documentosDestinatario ={ this.state.documentosDestinatario}
                    nuevaRegion={ this.nuevaRegion }
                    nuevoDocumento={ this.nuevoDocumento } 
                    compraDocumento={ this.compraDocumento }
                    aceptaDocumento= {this.aceptaDocumento}
                    finalizaDocumento= {this.finalizaDocumento}
                    addDocumentoNotaria={ this.addDocumentoNotaria }
                    /> }

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
