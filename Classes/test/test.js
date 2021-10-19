const { PaymentPackage } = require('../12.Payment-Package/PaymentPackage');
const { StringBuilder } = require('../13.String-Builder/StringBuilder');
const { assert, expect } = require('chai');


// task 12

describe('Task 12 Functionality tests', () => {
    describe('Test constructor functionality', () => {
        it('Should create object', () => {
            let instance = new PaymentPackage('name', 10.0);
            expect(instance).instanceof(PaymentPackage);
            expect(instance).property('name');
            expect(instance).property('value');
            expect(instance).property('VAT');
            expect(instance).property('active');
            expect(instance.name).equal('name');
            expect(instance.value).equal(10.0);
            expect(instance.VAT).equal(20);
            expect(instance.active).equal(true);
        })

        it('Should throw error due negative number', () => {
            expect(() => { new PaymentPackage('name', -10.0,) }).throw(Error);
        })
        it('Should throw error due invalid name and negative number', () => {
            expect(() => { new PaymentPackage('', -10.0) }).throw(Error);
        })
        it('Should throw error due invalid name', () => {
            expect(() => { new PaymentPackage('', 10.0) }).throw(Error);
        })
        it('Should throw error due undefined name and number', () => {
            expect(() => { new PaymentPackage(undefined, undefined) }).throw(Error);
        })
        it('Should throw error due not passed name and number', () => {
            expect(() => { new PaymentPackage() }).throw(Error);
        })
    });



    describe('Test name accessor functionality', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage('name', 10.0)
        });
        it('Should return corect name', () => {
            expect(instance.name).equal('name');
        });

        it('Should set name correctly', () => {
            instance.name = 'newName';
            expect(instance.name).equal('newName');
        });

        it('Should throw error due invalid name', () => {
            expect(() => { instance.name = '' }).throw(Error);
        });
        
        it('Should throw error due invalid name', () => {
            expect(() => { instance.name = 20 }).throw(Error);
        });

        it('Should throw error due indefined name', () => {
            expect(() => { instance.name = undefined }).throw(Error);
        });
    });


    describe('Test values accessor functionality', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage('name', 10.0)
        });
        it('Should return corect value', () => {
            expect(instance.value).equal(10.0);
        });

        it('Should set value correctly', () => {
            instance.value = 20.0;
            expect(instance.value).equal(20.0);
        });

        it('Should set value correctly', () => {
            instance.value = 0;
            expect(instance.value).equal(0);
        });

        it('Should throw error due invalid value', () => {
            expect(() => { instance.value = -1 }).throw(Error);
        });

        it('Should throw error due indefined value', () => {
            expect(() => { instance.value = undefined }).throw(Error);
        });
    });


    describe('Test VAT accessor functionality', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage('name', 10.0)
        });
        it('Should return corect VAT', () => {
            expect(instance.VAT).equal(20);
        });

        it('Should set VAT correctly', () => {
            instance.VAT = 30.0;
            expect(instance.VAT).equal(30.0);
        });

        it('Should throw error due invalid VAT', () => {
            expect(() => { instance.VAT = -1 }).throw(Error);
        });

        it('Should throw error due indefined VAT', () => {
            expect(() => { instance.VAT = undefined }).throw(Error);
        });

        it('Should throw error due indefined VAT', () => {
            expect(() => { instance.VAT = '30' }).throw(Error);
        });
    });


    describe('Test active accessor functionality', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage('name', 10.0)
        });

        it('Should return corect active', () => {
            expect(instance.active).equal(true);
        });

        it('Should set active correctly', () => {
            instance.active = false;
            expect(instance.active).equal(false);
        });

        it('Should throw error due invalid active', () => {
            expect(() => { instance.active = -1 }).throw(Error);
        });

        it('Should throw error due indefined active', () => {
            expect(() => { instance.active = undefined }).throw(Error);
        });
    });

    describe('Test toString functionality', () => {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage('name', 10.0)
        });

        it('Test active string', () => {
            expect(instance.toString()).equal('Package: name\n' +
                                            '- Value (excl. VAT): 10\n' + 
                                            '- Value (VAT 20%): 12');
        });

        it('Test inactive string', () => {
            instance.active = false;
            expect(instance.toString()).equal('Package: name (inactive)\n' +
                                            '- Value (excl. VAT): 10\n' + 
                                            '- Value (VAT 20%): 12');
        });
    });
});

// task 13 not solved by me
describe('Task 13 Functionality tests', () => {
    it('constructor functionality', () => {
        let obj = new StringBuilder('test');
        let obj2 = new StringBuilder();
        let expectedResult = ['t', 'e', 's', 't'];
        let expectedResult2 = [];

        let actualResult = obj._stringArray;
        let actualResult2 = obj2._stringArray;

        assert.deepEqual(actualResult, expectedResult);
        assert.deepEqual(actualResult2, expectedResult2);
    });

    it('constructor functionality wrong data', () => {
        assert.throws(() => new StringBuilder(12), TypeError, 'Argument must be a string');
        assert.throws(() => new StringBuilder([]), TypeError, 'Argument must be a string');
    });

    it('append method happy case', () => {
        let obj = new StringBuilder('test');
        let expectedResult = ['t', 'e', 's', 't', 't', 'e', 's', 't'];
        obj.append('test');

        let actualResult = obj._stringArray;

        assert.deepEqual(actualResult, expectedResult);
    });

    it('append method wrong data', () => {
        let obj = new StringBuilder('test');
        assert.throws(() => obj.append(12), TypeError, 'Argument must be a string');
        assert.throws(() => obj.append([]), TypeError, 'Argument must be a string');
    });

    it('prepend method happy case', () => {
        let obj = new StringBuilder('test');
        let expectedResult = ['1', '2', '3', '4', 't', 'e', 's', 't'];
        obj.prepend('1234');

        let actualResult = obj._stringArray;

        assert.deepEqual(actualResult, expectedResult);
    });

    it('prepend method wrong data', () => {
        let obj = new StringBuilder('test');
        assert.throws(() => obj.prepend(12), TypeError, 'Argument must be a string');
        assert.throws(() => obj.prepend([]), TypeError, 'Argument must be a string');
    });

    it('insertAt method happy case', () => {
        let obj = new StringBuilder('test');
        let expectedResult = ['1', '2', '3', '4', 't', 'e', 's', 't'];
        obj.insertAt('1234', 0);

        let actualResult = obj._stringArray;

        assert.deepEqual(actualResult, expectedResult);
    });

    it('insertAt method wrong data', () => {
        let obj = new StringBuilder('test');
        assert.throws(() => obj.insertAt(12, 0), TypeError, 'Argument must be a string');
        assert.throws(() => obj.insertAt([], 0), TypeError, 'Argument must be a string');
    });

    it('remove method happy case', () => {
        let obj = new StringBuilder('test');
        let expectedResult = ['t'];
        obj.remove(1, 3);

        let actualResult = obj._stringArray;

        assert.deepEqual(actualResult, expectedResult);
    });

    it('toString method happy case', () => {
        let obj = new StringBuilder('test');
        let expectedResult = 'test';

        let actualResult = obj.toString();

        assert.deepEqual(actualResult, expectedResult);
    });
});
