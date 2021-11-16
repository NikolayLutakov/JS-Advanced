const { expect } = require('chai');
const { dealership } = require('../dealership');


describe('Testing...', () => {
    it('newCarCost', () => {
       expect(dealership.newCarCost('Audi A4 B8', 30000)).equal(15000);
       expect(dealership.newCarCost('Audi A6 4K', 30000.99)).closeTo(10000.99, 0.01);
       expect(dealership.newCarCost('Audi A8 D5', 30000)).equal(5000);
       expect(dealership.newCarCost('Audi TT 8J', 30000)).equal(16000);
       expect(dealership.newCarCost('', 30000)).equal(30000);
       expect(dealership.newCarCost(30000)).undefined;
       expect(dealership.newCarCost('', -30000)).equal(-30000);
       expect(dealership.newCarCost('Audi A6 4K', 0)).equal(-20000);
       expect(dealership.newCarCost('', 0)).equal(0);
    });
    it('carEquipment', () => {
        expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation', 'etc'], [0, 2])).eql(['heated seats', 'sport rims']);
        expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation', 'etc'], [0])).eql(['heated seats']);
        expect(dealership.carEquipment(['heated seats', 'sliding roof', 'sport rims', 'navigation', 'etc'], [4])).eql(['etc']);
    });
    it('euroCategory', () => {
        expect(dealership.euroCategory(1)).equal('Your euro category is low, so there is no discount from the final price!');
        expect(dealership.euroCategory(0)).equal('Your euro category is low, so there is no discount from the final price!');
        expect(dealership.euroCategory(4)).equal('We have added 5% discount to the final price: 14250.');
        expect(dealership.euroCategory(10)).equal('We have added 5% discount to the final price: 14250.');
        expect(dealership.euroCategory()).equal('Your euro category is low, so there is no discount from the final price!');
        expect(dealership.euroCategory('10')).equal('We have added 5% discount to the final price: 14250.');
    });
});

//testing git