var expect = require('chai').expect,
    Struct = require('../index.js');

describe('Struct', function() {
    describe('#define', function() {
        it('defines a struct', function() {
            var MyStruct = Struct.define({
                a: Struct.Types.string
            });
            expect(new MyStruct()).to.be.instanceof(Struct.Struct);
        });
    });

    context('defined struct with one string field', function() {
        beforeEach(function() {
            this.MyStruct = Struct.define({
                fieldA: Struct.Types.string
            });
        });

        describe('#get', function() {
            it('gets a value from the struct', function() {
                var myStruct = new this.MyStruct({
                    fieldA: 'abc'
                });
                expect(myStruct.get('fieldA')).to.equal('abc');
            });
        });

        describe('#set', function() {
            it('sets a value to the struct', function() {
                var myStruct = new this.MyStruct();
                myStruct.set('fieldA', 'abc');
                expect(myStruct.get('fieldA')).to.equal('abc');
            });
        });
    });
});
