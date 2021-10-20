const {cinema} = require('../cinema');
const {expect} = require('chai');

describe('Cinema tests', () => {
    describe('showMovies tests', () => {
        it('Test without movies', () => {
            expect(cinema.showMovies([])).equal('There are currently no movies to show.')
        }); 
        it('Test with movies', () => {
            expect(cinema.showMovies(['movie1','movie2','movie3','movie4'])).equal('movie1, movie2, movie3, movie4')
            expect(cinema.showMovies([3, 'a'])).equal('3, a')
        }); 
        it('Test with one movie', () => {
            expect(cinema.showMovies(['movie1'])).equal('movie1')
        }); 
    });
    describe('ticketPrice tests', () => {
        it('Test with valid projection type', () => {
            expect(cinema.ticketPrice('Premiere')).equal(12.00)
            expect(cinema.ticketPrice('Normal')).equal(7.50)
            expect(cinema.ticketPrice('Discount')).equal(5.50)
        }); 
        it('Test with not valid projection type', () => {
            expect(() => {cinema.ticketPrice('invalid')}).throw('Invalid projection type.');
            expect(() => {cinema.ticketPrice('')}).throw('Invalid projection type.');
            expect(() => {cinema.ticketPrice(3)}).throw('Invalid projection type.');
        }); 
    });
    describe('swapSeatsInHall tests', () => {
        it('Test with valid seats', () => {
            expect(cinema.swapSeatsInHall(1, 20)).equal('Successful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(10, 3)).equal('Successful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(20, 1)).equal('Successful change of seats in the hall.');
        }); 
        it('Test with invalid seats', () => {
            expect(cinema.swapSeatsInHall(21, 2)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(2, 0)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(1.5, 2)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(1, 2.5)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(1)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall('1', 2)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(2, 21)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(0, 2)).equal('Unsuccessful change of seats in the hall.');
            expect(cinema.swapSeatsInHall(2, 2)).equal('Unsuccessful change of seats in the hall.');
        });
    });
});