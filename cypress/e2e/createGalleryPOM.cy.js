/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import { createGallery } from "../page_objects/createGallery"
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"

describe('Create gallery test cases', () => {
    beforeEach('Go to gallery page and login with valid data', () => {
        cy.visit('')
        navigation.clickOnLoginButton()
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        cy.wait(2000)
        cy.visit('/create')
    })

    it('Create gallery with valid data - with jpg format image', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
    })

    it('Create gallery with valid data - with jpeg format image', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpeg")
    })

    it('Create gallery with valid data - with png format image', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".png")
    })

    it('Create gallery with valid data - title with 2 characters', () => {
        createGallery.createGallery(faker.random.alpha(2), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
    })

    it('Create gallery with valid data - title with 255 characters', () => {
        createGallery.createGallery(faker.random.alpha(255), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
    })
     
    it('Create gallery with valid data - without description', () => {
        createGallery.createGallery(faker.name.jobTitle(), "{backspace}", faker.image.animals(450,450,true) + ".jpg")
    })

    it('Create gallery with valid data - description with 1000 characters', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.random.alpha(1000), faker.image.animals(450,450,true) + ".jpg")
    })

    it('Create gallery with title with less then 2 characters', () => {
        createGallery.createGallery(faker.random.alpha(1), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.wait(2000)
    })

    it('Create gallery with title with more then 255 characters', () => {
        createGallery.createGallery(faker.random.alpha(256), faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.wait(2000)
    })

    it('Create gallery without title', () => {
        createGallery.createGallery("{backspace}", faker.lorem.sentences(1), faker.image.animals(450,450,true) + ".jpg")
        cy.wait(2000)
    })

    it('Create gallery with description with more then 1000 characters', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.random.alpha(1001), faker.image.animals(450,450,true) + ".jpg")
        cy.wait(2000)
    })

    it('Create gallery without image url', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), "{backspace}")
        cy.wait(2000)
    })

    it('Create gallery with image url without image extension', () => {
        createGallery.createGallery(faker.name.jobTitle(), faker.lorem.sentences(1), faker.image.animals(450,450,true))
    })
})