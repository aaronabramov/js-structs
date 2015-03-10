var expect = require('chai').expect,
    Struct = require('../index.js');

describe('Struct', function() {
    describe('#define', function() {
        it('defines a struct', function() {
            var MyStruct = Struct.define({a: Struct.Types.string});
            expect(new MyStruct()).to.be.instanceof(Struct.Struct);
        });
    });
});
