/// <reference types="Cypress" />

const locators = require('../fixtures/locators.json')

import { faker } from '@faker-js/faker';

describe('Login test cases', () => {

    beforeEach("Go to gallery page and click on login button", () =>{
        cy.visit('')
        cy.get(locators.header.loginButton).click()
    })
    // it('Go to gallery page', () => {
    //     cy.visit('/')
    // })

    // it('Go to login page', () => {
    //     // cy.get('a[href="/login"]').click()
    //     cy.get(locators.header.loginButton).click()
    // })

    it('Login with valid data and logout', () => {
        cy.get(locators.login.emailInput).type('nekimail@gmail.com')
        cy.get(locators.login.passwordInput).type('nekipassword1')
        // cy.contains('Submit').click()
        // cy.get("button[type='submit']").click()
        cy.get(locators.login.submitButton).click()
        cy.get(locators.header.logoutButton).click()
    })

    // it('Logout', () => {
    //     //cy.contains('Logout').click()
    //     cy.get(locators.header.logoutButton).click()
    //     //cy.wait(1000)
    //     //cy.get('[class="nav-link nav-buttons"]').last().click()
    //     //cy.get('[class="nav-link nav-buttons"]').eq(2).click()
    // })

    it('Go to gallery page', () => {
        cy.visit('/login')
    })

    it('Login with invalid email - missing @', () => {
        cy.get(locators.login.emailInput).type('nekimailgmail.com')
        cy.get(locators.login.passwordInput).type('nekipassword1')
        cy.get(locators.login.submitButton).click()
    })

    it('Login with invalid email - missing .com', () => {
        cy.get(locators.login.emailInput).clear().type('nekimail@gmail')
        cy.get(locators.login.passwordInput).clear().type('nekipassword1')
        cy.get(locators.login.submitButton).click()
    })

    it('Login with invalid email - missing username', () => {
        cy.get(locators.login.emailInput).clear().type('@gmail.com')
        cy.get(locators.login.passwordInput).clear().type('nekipassword1')
        cy.get(locators.login.submitButton).click()
    })

    it('Login with incorrect password', () => {
        cy.get(locators.login.emailInput).clear().type('nekimail@gmail.com')
        cy.get(locators.login.passwordInput).clear().type('nekipassword123')
        cy.get(locators.login.submitButton).click()
    })

    it('Login without password', () => {
        cy.get(locators.login.emailInput).clear().type('nekimail@gmail.com')
        cy.get(locators.login.passwordInput).clear()
        cy.get(locators.login.submitButton).click()
    })
})