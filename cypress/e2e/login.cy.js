/// <reference types="Cypress" />

describe('Login test cases', () => {
    it('Go to gallery page', () => {
        cy.visit('/')
    })

    it('Go to login page', () => {
        cy.get('a[href="/login"]').click()
    })

    it('Login with valid data', () => {
        cy.get('#email').type('ndaca89@gmail.com')
        cy.get('#password').type('danijel17')
        cy.contains('Submit').click()
        //cy.get("button[type='submit']").click()
    })

    it('Logout', () => {
        cy.contains('Logout').click()
        //cy.get("a[role='button ']").click()
        //cy.wait(1000)
        //cy.get('[class="nav-link nav-buttons"]').last().click()
        //cy.get('[class="nav-link nav-buttons"]').eq(2).click()
    })

    it('Go to gallery page', () => {
        cy.visit('/login')
    })

    it('Login with invalid email - missing @', () => {
        cy.get('#email').type('ndaca89gmail.com')
        cy.get('#password').type('danijel17')
        cy.contains('Submit').click()
    })

    it('Login with invalid email - missing .com', () => {
        cy.get('#email').clear().type('ndaca89@gmail')
        cy.get('#password').clear().type('danijel17')
        cy.contains('Submit').click()
    })

    it('Login with invalid email - missing username', () => {
        cy.get('#email').clear().type('@gmail.com')
        cy.get('#password').clear().type('danijel17')
        cy.contains('Submit').click()
    })

    it('Login with incorrect password', () => {
        cy.get('#email').clear().type('ndaca89@gmail.com')
        cy.get('#password').clear().type('danijel1')
        cy.contains('Submit').click()
    })

    it('Login without password', () => {
        cy.get('#email').clear().type('ndaca89@gmail.com')
        cy.get('#password').clear()
        cy.contains('Submit').click()
    })
})