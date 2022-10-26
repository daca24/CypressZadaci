class Register {
    get firstNameInput() {
        return cy.get('#first-name')
    }

    get lastNameInput() {
        return cy.get('#last-name')
    }

    get emailInput() {
        return cy.get('#email')
    }

    get passwordInput() {
        return cy.get('#password')
    }

    get passwordConfirmation() {
        return cy.get('#password-confirmation')
    }

    get checkbox() {
        return cy.get("input[type='checkbox']")
    }

    get submitButton() {
        return cy.contains('Submit')
    }

    register(firstName, lastName, email, password, passwordConfirm) {
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.passwordConfirmation.type(passwordConfirm)
        this.checkbox.check()
        this.submitButton.click()
    }

    registerNoCheck(firstName, lastName, email, password, passwordConfirm) {
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.passwordConfirmation.type(passwordConfirm)
        this.checkbox.uncheck()
        this.submitButton.click()
    }
}

export const register = new Register()