const { expect } = require("chai");
const { numberOperations } = require('../03. Number Operations_Resources');

describe('Test number operations', () => {
    it('powNumber tests', () => {
        expect(numberOperations.powNumber(2)).equals(4);
    });
    it('numberChecker tests', () => {
        expect(numberOperations.numberChecker(2)).equals('The number is lower than 100!');
        expect(numberOperations.numberChecker(-2)).equals('The number is lower than 100!');
        expect(numberOperations.numberChecker(0)).equals('The number is lower than 100!');
        expect(numberOperations.numberChecker(99)).equals('The number is lower than 100!');
        expect(numberOperations.numberChecker(101)).equals('The number is greater or equal to 100!');
        expect(numberOperations.numberChecker(100)).equals('The number is greater or equal to 100!');
        expect(() => { numberOperations.numberChecker('dfdfgd') }).throw('The input is not a number!');
    });
    it('sumArrays tests', () => {
        expect(numberOperations.sumArrays([1, 2], [1, 2])).eql([2, 4]);
        expect(numberOperations.sumArrays([], [])).eql([]);
        expect(numberOperations.sumArrays([1], [1, 2])).eql([2, 2]);
        expect(numberOperations.sumArrays([1, 2], [1])).eql([2, 2]);
    });
});