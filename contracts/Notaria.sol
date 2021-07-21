// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CLPToken.sol";

contract Notaria is CLPToken() {
    address private owner;
    uint public documentsCount = 0;
    uint public documentosNotariaCount = 0;
    enum EstadoDocumentoNotaria{ ABIERTO, ACEPTADO, FINALIZADO }

    struct Documento{ 
        uint id;
        uint precio;
        string nombre;
        bool estado;
    }

    struct DocumentoNotaria{
        uint id;
        Documento documento;
        address owner;
        address destinatario;
        uint precio;
        EstadoDocumentoNotaria estado;
    }

    mapping(uint => Documento) public documentos;


    mapping(address => uint) public totalDocumentosEmisor;
    mapping(address => uint) public totalDocumentosDestinatario;
    
    mapping(uint => DocumentoNotaria) public documentosNotaria;
    mapping(address => mapping(uint => DocumentoNotaria)) public documentosNotariaEmisor;
    mapping(address => mapping(uint => DocumentoNotaria)) public documentosNotariaDestinatario;
    
    event DocumentoAdded(uint id, uint precio, string nombre, bool estado, address owner);
    event DocumentoNotariaAdded(uint id, Documento documento, string nombre,  address owner, uint precio);
    event DocumentoComprado(uint id, address owner);
    
    constructor() {
        owner = msg.sender;
    }

    function AddDocumento(uint _precio, string memory _nombre, bool _estado) public payable{
        require(msg.sender == owner, "Funcionalidad solo permitida para el owner");
        require(bytes(_nombre).length > 0, "El nombre debe tener un largo minimo");
        documentsCount++;
        documentos[documentsCount] = Documento(documentsCount, _precio,_nombre,_estado);       
        
        emit DocumentoAdded(documentsCount,_precio, _nombre, _estado, msg.sender);
    }
    
    function AddDocumentoNotaria(uint _idDocumento, uint _precio, address _destinatario) public payable returns(EstadoDocumentoNotaria){
        require(msg.sender != _destinatario, "El emisor del documento debe ser distinto al destinatario");
        Documento memory doc = documentos[_idDocumento];
        require(doc.id > 0, "El documento no existe en nuestros registros");
        documentosNotariaCount++;
        DocumentoNotaria memory docNotaria = DocumentoNotaria(documentosNotariaCount, doc, msg.sender, _destinatario, _precio, EstadoDocumentoNotaria.ABIERTO);
        documentosNotaria[documentosNotariaCount] = docNotaria;

        totalDocumentosEmisor[msg.sender]++;
        totalDocumentosDestinatario[_destinatario]++;
        documentosNotariaEmisor[msg.sender][documentosNotariaCount] = docNotaria;
        documentosNotariaDestinatario[_destinatario][documentosNotariaCount] = docNotaria;        
        return docNotaria.estado;
    }
    
    function AceptaDocumentoNotaria(uint _idDocumento) public payable returns (bool){
        
        DocumentoNotaria memory _docNotaria = GetDocumentoNotaria(_idDocumento);
        require(msg.value > _docNotaria.precio , "Monto insuficiente");
        require(_docNotaria.estado == EstadoDocumentoNotaria.ABIERTO);
        require(_docNotaria.destinatario == msg.sender, "Solo el destinatario puede aceptar el Documento");
        
        documentosNotaria[_idDocumento].estado = EstadoDocumentoNotaria.ACEPTADO;
        
        documentosNotariaDestinatario[msg.sender][_idDocumento].estado = EstadoDocumentoNotaria.ACEPTADO;
        
        require(documentosNotariaEmisor[_docNotaria.owner][_idDocumento].destinatario == _docNotaria.destinatario, "El destinatario no coincide con el de origen");
        documentosNotariaEmisor[_docNotaria.owner][_idDocumento].estado = EstadoDocumentoNotaria.ACEPTADO;
        
        return true;
    }
    
    function FinalizaDocumentoNotaria(uint _idDocumento) public payable returns (bool){
        
        DocumentoNotaria memory _docNotaria = GetDocumentoNotaria(_idDocumento);
        require(msg.value > _docNotaria.precio , "Monto insuficiente");
        require(_docNotaria.estado == EstadoDocumentoNotaria.ACEPTADO);
        require(_docNotaria.destinatario == msg.sender, "Solo el destinatario puede Acceder al pago de este Documento");
        
        require(msg.value >= _docNotaria.precio, "El monto enviado debe ser mayor o igual al precio");
        documentosNotaria[_idDocumento].estado = EstadoDocumentoNotaria.FINALIZADO;
        documentosNotariaDestinatario[msg.sender][_idDocumento].estado = EstadoDocumentoNotaria.FINALIZADO;
        require(documentosNotariaEmisor[_docNotaria.owner][_idDocumento].destinatario == _docNotaria.destinatario, "El destinatario no coincide con el de origen");
        
        documentosNotariaEmisor[_docNotaria.owner][_idDocumento].estado = EstadoDocumentoNotaria.FINALIZADO;
        payable(_docNotaria.owner).transfer(msg.value);
        return true;
    }
    
    function RechazaDocumentoNotaria(uint _idDocumento) public payable returns (bool){
        DocumentoNotaria memory _docNotaria = GetDocumentoNotaria(_idDocumento);
        require(_docNotaria.estado == EstadoDocumentoNotaria.ACEPTADO || _docNotaria.estado == EstadoDocumentoNotaria.ABIERTO);
        return true;
    }
    
    /*
    function CancelaDocumentoNotaria(uint _idDocumento) public payable returns (bool){
        require(msg.value > 1 ether, "Monto insuficiente");
        Documento memory doc = GetDocumento(_idDocumento);
        return true;
    }
    */
    
    function GetDocumento(uint _idDocumento) public view returns(Documento memory doc){
        doc = documentos[_idDocumento];
        return doc;
    }
    
    function GetDocumentoNotaria(uint _idDocumento) public view returns(DocumentoNotaria memory doc){
        doc = documentosNotaria[_idDocumento];
        return doc;
    }
    
    function GetDocumentoNotariaEmisor(uint _idDocumento, address _direccion) public view returns(DocumentoNotaria memory doc){
        doc = documentosNotariaEmisor[_direccion][_idDocumento];
        return doc;
    }
    
    function GetDocumentoNotariaDestinatario(uint _idDocumento, address _direccion) public view returns(DocumentoNotaria memory doc){
        doc = documentosNotariaDestinatario[_direccion][_idDocumento];
        return doc;
    }

 
    
    function GetOwner() public view returns (address){
        return owner;
    }

    modifier isOwner(){
        require(msg.sender == owner);
        _;
    } 

    receive() external payable {} 
}