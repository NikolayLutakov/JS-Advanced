const { sum } = require('../alabala/ala');
const { expect } = require('chai');
const { isOddOrEven } = require('../02.Even-or-Odd/evenOrOdd');
const { lookupChar } = require('../03.Char-Lookup/charLookup')
const { mathEnforcer  } = require('../04.Math-Enforcer/mathEnforcer')

//test if mocha works
describe('Test', () => {
    it('sdfasdf', () => {
        expect(sum(5, 3)).equal(8);
    });
});

//task 02
describe('Check is Even or Odd', () => {
    it('Should return undefined when not string', () => {
        expect(isOddOrEven(1)).equal(undefined)
    });

    it('Should return odd', () => {
        expect(isOddOrEven('a')).equal('odd')
    });

    it('Should return even', () => {
        expect(isOddOrEven('aa')).equal('even')
    });
});

//task 03
describe('Test Lookup Char Functinality', () => {
    it('Should return undefined', () => {
        expect(lookupChar(1, 1)).equal(undefined);
        expect(lookupChar('a', 'a')).equal(undefined);
        expect(lookupChar(1, 'a')).equal(undefined);
        expect(lookupChar('aaa', -1.1)).equal(undefined);
    });

    it('Should return Incorect index', () => {
        expect(lookupChar('aaa', 3)).equal('Incorrect index');
        expect(lookupChar('aaa', -1)).equal('Incorrect index');
    });

    it('Should return correct character', () => {
        expect(lookupChar('abc', 0)).equal('a');
        expect(lookupChar('abc', 2)).equal('c');
    });
});

//task 04
describe('Test Math Enforcer', () => {
    let instance = null;
    beforeEach(() => {
        instance = mathEnforcer
    })
    describe('Test addFive', () => {
        it('Should return undefined with non-number parameter', () => {
            expect(instance.addFive('32')).equal(undefined);
        });
        it('Should return correct answer with numeric parameter', () => {
            expect(instance.addFive(5)).equal(10);
            expect(instance.addFive(5.534563)).closeTo(10.53, 0.01);
            expect(instance.addFive(-5.534563)).closeTo(-0.53, 0.01);
            expect(instance.addFive(-5)).equal(0);
        });
    });

    describe('Test subtractTen', () => {
        it('Should return undefined with non-number parameter', () => {
            expect(instance.subtractTen('32')).equal(undefined);
        });
        it('Should return correct answer with numeric parameter', () => {
            expect(instance.subtractTen(10)).equal(0);
            expect(instance.subtractTen(10.534563)).closeTo(0.53, 0.01);
            expect(instance.subtractTen(-10.534563)).closeTo(-20.53, 0.01);
            expect(instance.subtractTen(-10)).equal(-20);
        });
    });

    describe('Test sum', () => {
        it('Should return undefined with non-number parameters', () => {
            expect(instance.sum('32', 1)).equal(undefined);
            expect(instance.sum(1, '32')).equal(undefined);
            expect(instance.sum('32', '1')).equal(undefined);
        });
        it('Should return correct answer with numeric parameters', () => {
            expect(instance.sum(10, 10)).equal(20);
            expect(instance.sum(10.534563, 10)).closeTo(20.53, 0.01);
            expect(instance.sum(10, 10.534563)).closeTo(20.53, 0.01);
            expect(instance.sum(-10.534563, 10)).closeTo(-0.53, 0.01);
            expect(instance.sum(-10, 10.534563)).closeTo(0.53, 0.01);
            expect(instance.sum(-10, 10)).equal(0);
            expect(instance.sum(10, -10)).equal(0);
        });
    });
});