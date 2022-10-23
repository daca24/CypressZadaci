class EditGallery {

    get firstGallery() {
        return cy.get("h2 > a[class='box-title']").eq(0)
    }

    get titleInput() {
        return cy.get("#title")
    }

    get descriptionInput() {
        return cy.get("#description")
    }

    get imageInput() {
        return cy.get("input[type='url']")
    }

    get submitButton() {
        return cy.contains("Submit")
    }

    get editButton() {
        return cy.contains("Edit Gallery")
    }

    editGallery(title, description, image) {
        this.titleInput.clear().type(title)
        this.descriptionInput.clear().type(description)
        this.imageInput.clear().type(image)
        this.submitButton.click()
    }

    getFirstGallery() {
        this.firstGallery.click()
        this.editButton.click()
    }
}

export const editGallery = new EditGallery()