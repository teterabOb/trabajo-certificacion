// This example code is designed to quickly deploy an example contract using Remix.

pragma solidity ^0.4.24;

contract Presupuesto {
    
    struct Region{
        address gobiernoRegional;
        string nombre;
        uint id;
    }
    
    struct PresupuestoMunicipal{
        uint montoAutorizado;
        uint idRegion;
    }
    
    
    
    Region[] public regiones;
    PresupuestoMunicipal[] public presupuestos;
    
    constructor() public {
        regiones.push(Region(address(0),'Atacama',0));
        regiones.push(Region(address(0),'Santiago',1));
        regiones.push(Region(address(0),'Aysen',2));
        regiones.push(Region(address(0),'Tarapaca',3));
        
        presupuestos.push(PresupuestoMunicipal(20,0));
        presupuestos.push(PresupuestoMunicipal(30,1));
        presupuestos.push(PresupuestoMunicipal(40,1));
    }
    
    function asignaDireccion(address direccion, uint id) public {
        Region region = regiones[id];
        region.gobiernoRegional = direccion;
    }
    
    function retiraFondosAsignados(uint idGobiernoRegional) public returns (bool){
        Region region = regiones[idGobiernoRegional];
        
        if(region.gobiernoRegional == msg.sender){
            PresupuestoMunicipal presupuesto = presupuestos[idGobiernoRegional];
            
            msg.sender.transfer(1 ether); 
            return true;
        }
        else
        {
            return false;
        }
        
    }
    
    function receive() external payable {}
    
}