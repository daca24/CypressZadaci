/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
import { navigation } from '../page_objects/navigation'
import { loginPage } from '../page_objects/loginPage'
import { general } from '../page_objects/general'
import data from '../fixtures/data.json'

describe('Login test cases', () => {

    beforeEach("Go to gallery page and click on login button", () =>{
        cy.visit('')
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
        navigation.clickOnLoginButton()
        cy.url().should('contain', '/login')
        general.headerTitle.should('have.text', data.headers.login)
    })

    it('Login with valid data and logout', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('validLogin')
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/logout').as('logout')
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        navigation.loginButton.should('not.exist')
        navigation.logoutButton.should('exist')
        // cy.wait(1000)
        // cy.wait('@validLogin').then(intercept => {
        //     expect(intercept.response.statusCode).to.eq(201);
        // })
        navigation.clickOnLogoutButton()
        navigation.logoutButton.should('not.exist')
        navigation.loginButton.should('exist')
        cy.wait('@validLogin').then(intercept => {
            // console.log(intercept);
            expect(intercept.response.statusCode).to.eq(200);
            expect(intercept.request.body.email).to.eq('nekimail@gmail.com')
            expect(intercept.request.body.password).to.eq(Cypress.env('validPassword'))
            expect(intercept.response.statusMessage).to.eq('OK')
        })
        cy.wait('@logout').its('response').then(response => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.message).to.eq("Successfully logged out")
            // console.log(response)
        })

    })

    it('Go to gallery page', () => {
        cy.visit('/login')
        cy.url().should('contain', '/login')
    })

    it('Login with invalid data', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('invalidDataLogin')
        loginPage.login(faker.internet.email(), 'nekipassword1')
        general.errorMessage.should('be.visible')
            .and('have.text', data.errors.badCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.css', 'color', 'rgb(114, 28, 36)')
        cy.wait('@invalidDataLogin').then(intercept =>{
            // console.log(intercept)
            expect(intercept.response.statusCode).to.eq(401)
            expect(intercept.response.statusMessage).to.eq('Unauthorized')
        })
    })

    it('Login with invalid email - missing .com', () => {
        cy.intercept('POST','https://gallery-api.vivifyideas.com/api/auth/login').as('invalidEmailLogin')
        loginPage.login('nekimail@gmail', 'nekipassword1')
        general.errorMessage.should('be.visible')
            .and('have.text', data.errors.badCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.css', 'color', 'rgb(114, 28, 36)')
        cy.wait('@invalidEmailLogin').then(intercept => {
            // console.log(intercept)
        expect(intercept.response.statusCode).to.eq(401)
        expect(intercept.response.statusMessage).to.eq('Unauthorized')
        })
    })

    it('Login with invalid email - missing username', () => {
        loginPage.login('@gmail.com', 'nekipassword1')
        cy.url().should('contain', '/login')
    })

    it('Login with incorrect password', () => {
        loginPage.login('nekimail@gmail.com', 'nekipassword123')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.badCredentials)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Login without password', () => {
        loginPage.login('nekimail@gmail.com',"{backspace}")
        cy.url().should('contain', '/login')
    })
})