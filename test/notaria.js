//const { default: Web3 } = require("web3");
const Notaria = artifacts.require("Notaria.sol");

let instance;

beforeEach(async() => {
    instance = await Notaria.new();
});

contract("Notaria", accounts => {
  it("should be owner to create documents", async () => {
    //let total = await instance.documentsCount;   
    const NotariaInstance = await Notaria.new();   
    await NotariaInstance.AddDocumento(1, "Casamiento", true, { from: accounts[0] });

  });

  it("should be documents created", async () => {  
    const NotariaInstance = await Notaria.new();
    NotariaInstance.AddDocumento(1, "Casamiento", true, { from: accounts[0] });
    await NotariaInstance.AddDocumentoNotaria(1, 10, accounts[1], { from: accounts[0] });

  });
});


/* 
        function AddDocumentoNotaria(uint _idDocumento, uint _precio, address _destinatario) public payable returns(EstadoDocumentoNotaria){
        require(msg.sender != _destinatario, "El emisor del documento debe ser distinto al destinatario");
        Documento memory doc = documentos[_idDocumento];
        require(doc.id > 0, "El documento no existe en nuestros registros");
        documentosNotariaCount++;
        DocumentoNotaria memory docNotaria = DocumentoNotaria(documentosNotariaCount, doc, msg.sender, _destinatario, _precio, EstadoDocumentoNotaria.ABIERTO);
        documentosNotaria[documentosNotariaCount] = docNotaria;
        documentosNotariaEmisor[msg.sender][documentosNotariaCount] = docNotaria;
        documentosNotariaDestinatario[_destinatario][documentosNotariaCount] = docNotaria;        
        return docNotaria.estado;
    }

    function AddDocumento(uint _precio, string memory _nombre, bool _estado) public payable{
        require(msg.sender == owner, "Funcionalidad solo permitida para el owner");
        require(bytes(_nombre).length > 0, "El nombre debe tener un largo minimo");
        documentos[documentsCount] = Documento(documentsCount, _precio,_nombre,_estado);
        documentsCount++;
        
        emit DocumentoAdded(documentsCount,_precio, _nombre, _estado, msg.sender);
    }

*/