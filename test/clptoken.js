const CLPToken = artifacts.require('CLPToken.sol')

contract('CLPToken', accounts => {
    const _name = 'CLPToken';
    const _symbol = 'CLPT';
    const _decimals = 18;

    beforeEach(async function() {
       this.token = await CLPToken.new(_name, _symbol, _decimals);
    });

    /*
    describe('token attributes', () => {
        it('has the correct name', function(){
            const name = await this.token.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', function(){
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });

        it('has the correct decimals', function(){
            const decimals = await this.token.decimals();
            symbol.should.be.bignumber.equal(_decimals);
        });
        
    });
    */
});