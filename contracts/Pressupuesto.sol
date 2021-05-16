// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Presupuesto {

    address public owner;
    uint public RegionCount = 0;

    
    
    struct PresupuestoMunicipal{
        uint montoAutorizado;
        uint idRegion;
    }
    
    struct Region{
        address payable direccionGobRegional;
        string nombre;
        uint id;
    }

    mapping(uint => Region) public regiones;

    event RegionCreada(address payable direccionGobRegional, string nombre, uint id);
        
    PresupuestoMunicipal[] public presupuestos;
    
    constructor()  {

    }
    
    function nuevaRegion(address payable _direccion, string memory _nombre) public {
        // Require a valid name
        require(bytes(_nombre).length > 0);
        // Require a valid price
        //require(_price > 0);
        // Increment product count
        RegionCount ++;
        // Create the product
        regiones[RegionCount] = Region( _direccion ,_nombre, RegionCount );
        // Trigger an event
        emit RegionCreada(_direccion, _nombre, RegionCount  );
    }

   
    function asignaDireccion(uint _idRegion, address payable _direccion) public payable{
        Region storage region = regiones[_idRegion];
        region.direccionGobRegional = _direccion;     
    }
    
    function retiraFondosAsignados(uint idGobiernoRegional) public returns (bool){
        /*
        Region memory region = regiones[idGobiernoRegional];
        
        if(region.gobiernoRegional == msg.sender){
            //PresupuestoMunicipal memory presupuesto = presupuestos[idGobiernoRegional];
            
            region.gobiernoRegional.transfer(1 ether); 
            return true;
        }
        else
        {
            return false;
        }
        */
        
    }

    receive() external payable {}    
}