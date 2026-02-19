/**
 * @file spec.cy.js
 * @description Basic E2E test to verify the application deployment.
 */
describe('Home page spec', () => {
    it('deployed react app to localhost', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Registered Users').should('be.visible')
    })
})