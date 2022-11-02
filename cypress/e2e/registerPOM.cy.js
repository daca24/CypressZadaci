/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
import { general } from '../page_objects/general';
const { register } = require('../page_objects/register')
import data from '../fixtures/data.json'

describe('Register test cases', () => {
    let firstName = ''
    beforeEach('Go to register page', () => {
        firstName = faker.name.firstName()
        cy.visit('/register')
        cy.url().should('contain', '/register')
    })

    it('Register with valid data', () => {
        cy.intercept('POST','https://gallery-api.vivifyideas.com/api/auth/register').as('validRegister')
        register.register(firstName, faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass1234')
        general.headerTitle.should('have.text', data.headers.allGalleries)
        cy.wait('@validRegister').then(intercept => {
            console.log(intercept)
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.statusMessage).to.eq('OK')
            expect(intercept.request.body.first_name).to.eq(firstName)
        })
    })

    it('Register without first name', () => {
        // cy.intercept('POST','https://gallery-api.vivifyideas.com/api/auth/register').as('noNameReg')
        register.register('{backspace}', faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
        // cy.wait('@noNameReg').then(intercept => {
        //     console.log(intercept)
        // })
    })

    it('Register without last name', () => {
        register.register(faker.name.firstName(), '{backspace}', faker.internet.email(), 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register without email', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), '{backspace}', 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register without password', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), '{backspace}', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register without password confirmation', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 'pass1234', '{backspace}')
        cy.url().should('contain', '/register')
    })

    it('Register without accepting terms and conditions', () => {
        cy.intercept('POST','https://gallery-api.vivifyideas.com/api/auth/register').as('noTerms')
        register.registerNoCheck(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass1234')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.noTermsAccepted)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
        cy.wait('@noTerms').then(intercept => {
            // console.log(intercept)
            expect(intercept.response.statusCode).to.eq(422)
            expect(intercept.response.statusMessage).to.eq('Unprocessable Entity')
            expect(intercept.response.body.message).to.eq('The given data was invalid.')
        })
    })

    it('Register - password and confirmed password do not match', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass12345')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.passConfirmNotMatch)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Register with invalid email - missing @', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), 'nekimailgmail.com', 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register with invalid email - missing .com', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), 'nekimail@gmail', 'pass1234', 'pass1234')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.invalidEmail)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Register with invalid email - missing username', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), '@gmail.com', 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register with invalid password - without digits', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 'password', 'password')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.passNoDigits)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Register with invalid password - less than 8 characters', () => {
        register.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 'pass', 'pass')
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.passLessThanEight)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Register with invalid first name - less than two characters', () => {
        register.register(faker.random.alpha(1), faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass1234')
        cy.wait(1000)
    })

    it('Register with invalid first name - more than 255 characters', () => {
        register.register(faker.random.alpha(256), faker.name.lastName(), faker.internet.email(), 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })

    it('Register with invalid last name - less than two characters', () => {
        register.register(faker.name.firstName(), faker.random.alpha(1), faker.internet.email(), 'pass1234', 'pass1234')
        cy.wait(1000)
    })

    it('Register with invalid last name - more than 255 characters', () => {
        register.register(faker.name.firstName(), faker.random.alpha(256), faker.internet.email(), 'pass1234', 'pass1234')
        cy.url().should('contain', '/register')
    })


})