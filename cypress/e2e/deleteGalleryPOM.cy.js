/// <reference types="Cypress" />
import { deleteGallery } from "../page_objects/deleteGallery"
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"

describe('Delete gallery', () => {
    before('Go to gallery page, login with valid data, go to My galleries and click on the first gallery', () => {
        cy.visit('')
        navigation.clickOnLoginButton()
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        cy.wait(2000)
        cy.visit('/my-galleries')
    })

    it('Delete gallery', () => {
        deleteGallery.deleteGallery()
    })
})