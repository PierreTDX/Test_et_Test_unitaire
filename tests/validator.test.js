import { calculateAge } from "./../module/validator.js";

/**
* @function calculateAge
*/
describe('calculateAge Unit Test Suites', () => {
    let people20years;

    beforeEach(() => {
        const today = new Date();
        // Dynamic date calculation ensures tests pass next year
        people20years = {
            birth: new Date(today.getFullYear() - 20, today.getMonth(), today.getDate())
        };
    })

    it('should return a correct age', () => {
        expect(calculateAge(people20years)).toEqual(20)
    })

    it('should throw an error when no argument is passed', () => {
        expect(() => calculateAge()).toThrow("missing param p")
    })

    it('should throw an error when the argument is not an object', () => {
        expect(() => calculateAge("not-an-object")).toThrow("param p must be an object")
    })

    it('should throw an error when the object does not contain a birth field', () => {
        expect(() => calculateAge({})).toThrow("missing param p.birth")
    })

    it('should throw an error when the birth field is not a Date object', () => {
        expect(() => calculateAge({ birth: "1990-01-01" })).toThrow("p.birth must be a Date object")
    })

    it('should throw an error when the birth date is invalid', () => {
        expect(() => calculateAge({ birth: new Date("invalid-date") })).toThrow("p.birth is an invalid Date")
    })
})