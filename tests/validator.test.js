import { calculateAge } from "./../module/validator.js";
let people20years;
beforeEach(() => {
    let date = new Date();
    people20years = {
        birth: new Date(date.setFullYear(date.getFullYear() - 20))
    };
})
/**
* @function calculateAge
*/
describe('calculateAge Unit Test Suites', () => {
    it('should return a correct age', () => {
        expect(calculateAge(people20years)).toEqual(20)
    })

    it('should throw a "missing param p" error', () => {
        expect(() => calculateAge()).toThrow("missing param p")
    })
})