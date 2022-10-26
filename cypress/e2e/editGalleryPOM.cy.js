/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import { editGallery } from "../page_objects/editGallery"
import { general } from '../page_objects/general'
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"

describe('Edit gallery', () => {
    let galleryName = '';
    beforeEach('Go to gallery page, login with valid data, go to My galleries and click on the first gallery', () => {
        galleryName = faker.lorem.sentence(3);
        cy.visit('')
        navigation.clickOnLoginButton()
        cy.url().should('contain', '/login')
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        navigation.loginButton.should('not.exist')
        navigation.logoutButton.should('exist')
        cy.visit('/my-galleries')
        cy.url().should('contain', '/my-galleries')
        editGallery.getFirstGallery()
    })

    it("Edit gallery", () => {
        editGallery.editGallery(galleryName, faker.lorem.sentence(5), faker.image.animals(450,450,true) + ".jpg")
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text',galleryName)
        })
})