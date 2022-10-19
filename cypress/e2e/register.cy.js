/// <reference types="Cypress" />

describe('Register test cases', () => {
    beforeEach('Go to register page', () => {
        cy.visit('/register')
    })

    // it('Register with valid data', () => {
    //     cy.get('#first-name').type('NekoIme')
    //     cy.get('#last-name').type('NekoPrezime')
    //     cy.get('#email').type('nekimail@gmail.com')
    //     cy.get('#password').type('nekipassword1')
    //     cy.get('#password-confirmation').type('nekipassword1')
    //     cy.get('input[type="checkbox"]').check()
    //     cy.contains('Submit').click()
    // })

    it('Register without first name', () => {
        cy.get('#first-name')
        cy.get('#last-name').type('NekoPrezime')
        cy.get('#email').type('nekimail1@gmail.com')
        cy.get('#password').type('nekipassword1')
        cy.get('#password-confirmation').type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register without last name', () => {
        cy.get('#first-name').type('NekoIme')
        cy.get('#last-name').clear()
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register without email', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear()
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register without password', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear()
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register without password confirmation', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear()
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

        it('Register without accepting terms and conditions', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').uncheck()
        cy.contains('Submit').click()
    })

    it('Register - password and confirmed password do not match', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword12')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid email - missing @', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid email - missing .com', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid email - missing username', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid password - without digits', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail11@gmail.com')
        cy.get('#password').clear().type('nekipassword')
        cy.get('#password-confirmation').clear().type('nekipassword')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid password - less than 8 characters', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail11@gmail.com')
        cy.get('#password').clear().type('neki4')
        cy.get('#password-confirmation').clear().type('neki4')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid first name - less than two characters', () => {
        cy.get('#first-name').clear().type('N')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail1@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid first name - more than 255 characters', () => {
        cy.get('#first-name').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim ultrices ligula, et ullamcorper tellus pretium quis. Aenean egestas rutrum aliquam. Suspendisse potenti. Donec at ex at velit convallis pharetra lobortis quis ipsum. Proin libero.')
        cy.get('#last-name').clear().type('NekoPrezime')
        cy.get('#email').clear().type('nekimail24@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid last name - less than two characters', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('N')
        cy.get('#email').clear().type('nekimail2@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })

    it('Register with invalid last name - more than 255 characters', () => {
        cy.get('#first-name').clear().type('NekoIme')
        cy.get('#last-name').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim ultrices ligula, et ullamcorper tellus pretium quis. Aenean egestas rutrum aliquam. Suspendisse potenti. Donec at ex at velit convallis pharetra lobortis quis ipsum. Proin libero.')
        cy.get('#email').clear().type('nekimail25@gmail.com')
        cy.get('#password').clear().type('nekipassword1')
        cy.get('#password-confirmation').clear().type('nekipassword1')
        cy.get('input[type="checkbox"]').check()
        cy.contains('Submit').click()
    })


})