/**
 * 1. Type checks
 * 2. Field enforcement
 *
 *  var MyStruct = new Struct({
 *      fieldA: Struct.Types.string,
 *      fieldB: Struct.Types.object,
 *      FieldC: function contract(value) {
 *          if (value >= 99) {
 *              return 'precondition violated, expected value to be < 99, got: ' + value;
 *          }
 *      }
 *  })
 *
 *  var myObj = new MyStruct({
 *      fieldA: 'My Field A',
 *      fieldB: {a: 'test'},
 *      fieldC: 44
 *  });
 *
 *  myObj.get('fieldA') // => 'My Field A'
 *  myObj.set('fieldA', 'test') // => myObj
 *  myObj.get('fieldA') // => 'test'
 *  myObj.set('fieldB', 99) // => Error: 'Type violation'
 *  myObj.set('fieldC', 1000) // => Error: 'Contract violation'
 *  myObj.set('undefinedField', 40) // => Error: 'Undefined field'
 */


var Types = {
    string: 'STRUCT_STRING',
    number: 'STRUCT_NUMBER',
    bool: 'STRUCT_BOOLEAN',
    object: 'STRUCT_OBJECT',
    func: 'STRUCT_FUNCTION'
};

function Struct() {}


/**
 * @param {String} name attribute name
 */
Struct.prototype.get = function(name) {
    if (this.definition[name]) {
        throw new Error('unknown attribute: ' + name);
    }
    return this.attributes[name];
};

/**
 * @param {String} name attribute name
 * @param {Object} value to set
 */
Struct.prototype.set = function(name, value) {
    var def = this.definition[name],
        invalidMessage;

    if (def) {
        throw new Error('unknown attribute: ' + name);
    }

    invalidMessage = this.runChecks(def, value);

    if (invalidMessage) {
        throw new Error(invalidMessage);
    }

    this.attributes[name] = value;
    return this;
};

Struct.prototype.runChecks = function() {};

module.exports = {
    Struct: Struct,
    Types: Types,
    /**
     * @param {Object} definition of a struct containing all fields and their
     * descriptions.
     * @return {Struct} constructor for the newly created struct.
     */
    define: function(definition) {
        var proto = new Struct();

        /**
         * @constructor
         * @param {Object} attributes object containing k,v pairs
         */
        function StructConstructor(attributes) {
            // define attributes object
            this.attributes = {};
            // set attributes one by one
            for (var k in attributes) {
                this.set(k, attributes[k]);
            }
        };

        // save the definition object on the defined struct prototype
        proto.definition = definition;
        // define 3 layer hierarchy
        StructConstructor.prototype = proto;

        return StructConstructor;
    },

};
