/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import { createGallery } from "../page_objects/createGallery"
import { editGallery } from "../page_objects/editGallery"
import { general } from '../page_objects/general'
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"
import data from '../fixtures/data.json'

describe('Create gallery test cases', () => {
    let galleryName = '';
    beforeEach('Go to gallery page and login with valid data', () => {
        galleryName = faker.name.jobTitle();
        cy.visit('')
        navigation.clickOnLoginButton()
        cy.url().should('contain', '/login')
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        navigation.loginButton.should('not.exist')
        navigation.logoutButton.should('exist')
        cy.visit('/create')
        cy.url().should('contain', '/create')
    })

    it('Create gallery with valid data - with jpg format image', () => {
        createGallery.createGallery(galleryName, faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
        editGallery.getFirstGallery()
        general.headerTitle.should('have.text',galleryName)
    })

    it('Create gallery with valid data - with jpeg format image', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpeg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })

    it('Create gallery with valid data - with png format image', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".png")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })

    it('Create gallery with valid data - title with 2 characters', () => {
        createGallery.createGallery(faker.random.alpha(2), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })

    it('Create gallery with valid data - title with 255 characters', () => {
        createGallery.createGallery(faker.random.alpha(255), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })
     
    it('Create gallery with valid data - without description', () => {
        createGallery.createGallery(faker.name.jobTitle(), "{backspace}", faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })

    it('Create gallery with valid data - description with 1000 characters', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.random.alpha(1000), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })

    it('Create gallery with title with less then 2 characters', () => {
        createGallery.createGallery(faker.random.alpha(1), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.titleLessThanTwo)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Create gallery with title with more then 255 characters', () => {
        createGallery.createGallery(faker.random.alpha(256), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.titleMoreThan255)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Create gallery without title', () => {
        createGallery.createGallery("{backspace}", faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', '/create')
    })

    it('Create gallery with description with more then 1000 characters', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.random.alpha(1001), faker.image.animals(450,450,true) + ".jpg")
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.descriptionMoreThan1000)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })

    it('Create gallery without image url', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), "{backspace}")
        cy.url().should('contain', '/create')
    })

    it('Create gallery with image url without image extension', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true))
        general.errorMessage.should('be.visible')
        .and('have.text', data.errors.wrongImageFormat)
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
    })
})