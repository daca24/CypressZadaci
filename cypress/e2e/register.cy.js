/// <reference types="Cypress" />

const locators = require('../fixtures/locators.json')

describe('Register test cases', () => {
    beforeEach('Go to register page', () => {
        cy.visit('/register')
    })

    // it('Register with valid data', () => {
    //     cy.get(locators.register.firstName).type('NekoIme')
    //     cy.get(locators.register.lastName).type('NekoPrezime')
    //     cy.get(locators.register.emailInput).type('nekimail@gmail.com')
    //     cy.get(locators.register.passwordInput).type('nekipassword1')
    //     cy.get(locators.register.passwordConfirmation).type('nekipassword1')
    //     cy.get(locators.register.checkbox).check()
    //     cy.get(locators.register.submitButton).click()
    // })

    it('Register without first name', () => {
        cy.get(locators.register.firstName)
        cy.get(locators.register.lastName).type('NekoPrezime')
        cy.get(locators.register.emailInput).type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        //cy.contains('Submit').click()
        cy.get(locators.register.submitButton).click()
    })

    it('Register without last name', () => {
        cy.get(locators.register.firstName).type('NekoIme')
        cy.get(locators.register.lastName).clear()
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register without email', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear()
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register without password', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear()
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register without password confirmation', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear()
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

        it('Register without accepting terms and conditions', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).uncheck()
        cy.get(locators.register.submitButton).click()
    })

    it('Register - password and confirmed password do not match', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword12')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid email - missing @', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid email - missing .com', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid email - missing username', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid password - without digits', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail11@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid password - less than 8 characters', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail11@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('neki4')
        cy.get(locators.register.passwordConfirmation).clear().type('neki4')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid first name - less than two characters', () => {
        cy.get(locators.register.firstName).clear().type('N')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail1@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid first name - more than 255 characters', () => {
        cy.get(locators.register.firstName).clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim ultrices ligula, et ullamcorper tellus pretium quis. Aenean egestas rutrum aliquam. Suspendisse potenti. Donec at ex at velit convallis pharetra lobortis quis ipsum. Proin libero.')
        cy.get(locators.register.lastName).clear().type('NekoPrezime')
        cy.get(locators.register.emailInput).clear().type('nekimail24@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid last name - less than two characters', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('N')
        cy.get(locators.register.emailInput).clear().type('nekimail2@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })

    it('Register with invalid last name - more than 255 characters', () => {
        cy.get(locators.register.firstName).clear().type('NekoIme')
        cy.get(locators.register.lastName).clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim ultrices ligula, et ullamcorper tellus pretium quis. Aenean egestas rutrum aliquam. Suspendisse potenti. Donec at ex at velit convallis pharetra lobortis quis ipsum. Proin libero.')
        cy.get(locators.register.emailInput).clear().type('nekimail25@gmail.com')
        cy.get(locators.register.passwordInput).clear().type('nekipassword1')
        cy.get(locators.register.passwordConfirmation).clear().type('nekipassword1')
        cy.get(locators.register.checkbox).check()
        cy.get(locators.register.submitButton).click()
    })


})