/// <reference types="Cypress" />

const locators = require('../fixtures/locators.json')

import { faker } from '@faker-js/faker';

import { navigation } from '../page_objects/navigation'
import { loginPage } from '../page_objects/loginPage'

describe('Login test cases', () => {

    beforeEach("Go to gallery page and click on login button", () =>{
        cy.visit('')
        navigation.clickOnLoginButton()
    })

    it('Login with valid data and logout', () => {
        loginPage.login('ndaca89@gmail.com', 'danijel17')
        cy.wait(1000)
        navigation.clickOnLogoutButton
    })

    it('Go to gallery page', () => {
        cy.visit('/login')
    })

    it('Login with invalid email', () => {
        loginPage.login('ndaca89@gmail.com', faker.internet.password())
    })

    it('Login with invalid email - missing .com', () => {
        cy.get(locators.login.emailInput).clear().type('ndaca89@gmail')
        cy.get(locators.login.passwordInput).clear().type('danijel17')
        cy.get(locators.login.submitButton).click()
    })

    it('Login with invalid email - missing username', () => {
        cy.get(locators.login.emailInput).clear().type('@gmail.com')
        cy.get(locators.login.passwordInput).clear().type('danijel17')
        cy.get(locators.login.submitButton).click()
    })

    it('Login with incorrect password', () => {
        cy.get(locators.login.emailInput).clear().type('ndaca89@gmail.com')
        cy.get(locators.login.passwordInput).clear().type('danijel1')
        cy.get(locators.login.submitButton).click()
    })

    it('Login without password', () => {
        loginPage.login('ndaca89@gmail.com',"{backspace}")
    })
})