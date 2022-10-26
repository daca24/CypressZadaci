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
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        navigation.loginButton.should('not.exist')
        navigation.logoutButton.should('exist')
        // cy.wait(1000)
        navigation.clickOnLogoutButton()
        navigation.logoutButton.should('not.exist')
        navigation.loginButton.should('exist')
    })

    it('Go to gallery page', () => {
        cy.visit('/login')
        cy.url().should('contain', '/login')
    })

    it('Login with invalid data', () => {
        loginPage.login(faker.internet.email(), 'nekipassword1')
        general.errorMessage.should('be.visible')
            .and('have.text', data.errors.badCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Login with invalid email - missing .com', () => {
        loginPage.login('nekimail@gmail', 'nekipassword1')
        general.errorMessage.should('be.visible')
            .and('have.text', data.errors.badCredentials)
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
            .and('have.css', 'color', 'rgb(114, 28, 36)')
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