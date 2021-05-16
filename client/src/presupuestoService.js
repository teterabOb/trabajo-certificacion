export class PresupuestoService{
    constructor(contract){
        this.contract = contract;
    }

    async asignaDireccion(direccion, id){
        return this.contract.asignaDireccion(direccion, id);
    }
}