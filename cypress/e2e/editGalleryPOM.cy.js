/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import { editGallery } from "../page_objects/editGallery"
import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"

describe('Edit gallery', () => {
    beforeEach('Go to gallery page, login with valid data, go to My galleries and click on the first gallery', () => {
        cy.visit('')
        navigation.clickOnLoginButton()
        loginPage.login('nekimail@gmail.com', 'nekipassword1')
        cy.wait(2000)
        cy.visit('/my-galleries')
        editGallery.getFirstGallery()
    })

    it("Edit gallery", () => {
            editGallery.editGallery(faker.lorem.sentence(3), faker.lorem.sentence(5), faker.image.animals(450,450,true) + ".jpg")
    })
})