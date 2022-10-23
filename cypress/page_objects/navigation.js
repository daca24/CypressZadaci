class Navigation {

    get loginButton(){
        return cy.get("a[href='/login']")
    }

    get logoutButton() {
        return cy.get("a[role='button ']")
    }

    clickOnLoginButton(){
        this.loginButton.click()
    }

    clickOnLogoutButton() {
        this.logoutButton.click()
    }
}

export const navigation = new Navigation()