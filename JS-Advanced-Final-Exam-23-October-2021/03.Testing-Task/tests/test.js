const { expect } = require("chai");
const { library } = require("../library");


describe('Tests..', () => {
    it('calcPriceOfBook tests', ()=> {
        expect(library.calcPriceOfBook('name', 1981)).equal(`Price of name is 20.00`)
        expect(library.calcPriceOfBook('name', 1980)).equal(`Price of name is 10.00`)
        expect(() => {library.calcPriceOfBook(1980)}).throw(`Invalid input`)
        expect(() => {library.calcPriceOfBook()}).throw(`Invalid input`)
        expect(() => {library.calcPriceOfBook(123, 1980)}).throw(`Invalid input`)
        expect(() => {library.calcPriceOfBook('123', '1980')}).throw(`Invalid input`)
    })
    it('findBook  tests', ()=> {
        expect(library.findBook(['Troy', 'Life Style', 'Torronto'], 'Troy')).equal('We found the book you want.')
        expect(library.findBook(['Troy', 'Life Style', 'Torronto'], 'Troy1')).equal('The book you are looking for is not here!')
        expect(() => {library.findBook([], 'Troy1')}).throw('No books currently available')
    })
    it('arrangeTheBooks  tests', ()=> {
        expect(() => {library.arrangeTheBooks('1981')}).throw(`Invalid input`)
        expect(() => {library.arrangeTheBooks(1.1)}).throw(`Invalid input`)
        expect(() => {library.arrangeTheBooks(-1)}).throw(`Invalid input`)
        expect(library.arrangeTheBooks(40)).equal(`Great job, the books are arranged.`)
        expect(library.arrangeTheBooks(0)).equal(`Great job, the books are arranged.`)
        expect(library.arrangeTheBooks(41)).equal(`Insufficient space, more shelves need to be purchased.`)
    })
})