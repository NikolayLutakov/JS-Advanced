const { expect } = require('chai');
const { testNumbers } = require('../testNumbers');


describe('Tests', () => {
    describe('sumNumber tests', () => {
        it('Check sum', () => {
            expect(testNumbers.sumNumbers(1, 2)).equal('3.00');
            expect(testNumbers.sumNumbers(1.1, 2)).equal('3.10');
            expect(testNumbers.sumNumbers(1, 2.1)).equal('3.10');
            expect(testNumbers.sumNumbers(1.1, 2.1)).equal('3.20');
            expect(testNumbers.sumNumbers(-1.1, 2.1)).equal('1.00');
            expect(testNumbers.sumNumbers(1.1, -2.1)).equal('-1.00');
            expect(testNumbers.sumNumbers(0, -2.1)).equal('-2.10');
            expect(testNumbers.sumNumbers(1.1, 0)).equal('1.10');
            expect(testNumbers.sumNumbers(0, 0)).equal('0.00');
        });
        it('Check not number parameters', () => {
            expect(testNumbers.sumNumbers('1', 2)).equal(undefined);
            expect(testNumbers.sumNumbers(1.1, '2')).equal(undefined);
            expect(testNumbers.sumNumbers()).equal(undefined);
            expect(testNumbers.sumNumbers('1.1', '2.1')).equal(undefined);
        });
    });
    describe('numberChecker tests', () => {
        it('Check number parameter', () => {
            expect(testNumbers.numberChecker('1')).equal('The number is odd!');
            expect(testNumbers.numberChecker(1)).equal('The number is odd!');
            expect(testNumbers.numberChecker('2')).equal('The number is even!');
            expect(testNumbers.numberChecker(2)).equal('The number is even!');
            expect(testNumbers.numberChecker('0')).equal('The number is even!');
            expect(testNumbers.numberChecker(0)).equal('The number is even!');
            expect(testNumbers.numberChecker('-2')).equal('The number is even!');
            expect(testNumbers.numberChecker(-2)).equal('The number is even!');
            expect(testNumbers.numberChecker('-1')).equal('The number is odd!');
            expect(testNumbers.numberChecker(-1)).equal('The number is odd!');
        });
        it('Check not number parameter', () => {
            expect(() => { testNumbers.numberChecker('sdfas') }).throw('The input is not a number!')
            expect(() => { testNumbers.numberChecker() }).throw('The input is not a number!')
        });
    });
    describe('averageSumArray tests', () => {
        it('Check number array', () => {
            expect(testNumbers.averageSumArray([1, 2, 3])).equal(2);
            expect(testNumbers.averageSumArray([1.1, 2.2, 3.3])).closeTo(2.20, 0.01);
            expect(testNumbers.averageSumArray([0, 0, 0])).equal(0);
            expect(testNumbers.averageSumArray([1])).equal(1);
        });
    });

});