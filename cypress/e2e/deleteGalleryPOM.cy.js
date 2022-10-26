/// <reference types="Cypress" />
import { deleteGallery } from "../page_objects/deleteGallery"
import { general } from "../page_objects/general"
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"
import data from '../fixtures/data.json'

describe('Delete gallery', () => {
    before('Go to gallery page, login with valid data, go to My galleries and click on the first gallery', () => {
        cy.visit('')
        navigation.clickOnLoginButton()
        cy.url().should('contain', '/login')
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        navigation.loginButton.should('not.exist')
        navigation.logoutButton.should('exist')
        cy.visit('/my-galleries')
        cy.url().should('contain', '/my-galleries')
    })

    it('Delete gallery', () => {
        deleteGallery.deleteGallery()
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com')
        general.headerTitle.should('have.text', data.headers.allGalleries)
    })
})