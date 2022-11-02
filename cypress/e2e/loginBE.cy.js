/// <reference types="Cypress" />
import { navigation } from '../page_objects/navigation'

var token;

describe('Login BE', () => {
    beforeEach('Login with BE', () => {
        // cy.loginBE('nekimail@gmail.com', 'nekipassword1')

        // cy.loginBE(Cypress.env('validEmail'), Cypress.env('validPassword'))
        
        // cy.request({
        //     method: 'POST',
        //     url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        //     body: {
        //         email: "nekimail@gmail.com",
        //         password: "nekipassword1"     
        //     }
        // }).its('body').then(body => {
        //     console.log(body);
        //     // window.localStorage.setItem('token', response.access_token)
        //     token = body.access_token
        // })
        cy.request('POST', 'https://gallery-api.vivifyideas.com/api/auth/login', {
            email: "nekimail@gmail.com",
            password: "nekipassword1"
        }).its('body').then(response => {
            console.log(response);
            // window.localStorage.setItem('token', response.access_token)
            token = response.access_token
        })
    })

    beforeEach('Set token in local storage', () => {
        window.localStorage.setItem('token', token)
    })

    it('Check if we are logged', () => {
        cy.visit('')
        navigation.logoutButton.should('exist')
    })

    it('Logout BE', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/logout',
            headers: {
                authorization: `Bearer ${token}`
            }
        // }).then(() => {
        //     navigation.logoutButton.should('not.exist')
        })
        
    })
})