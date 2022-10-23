class CreateGallery {
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

    createGallery(title, description, image) {
        this.titleInput.type(title)
        this.descriptionInput.type(description)
        this.imageInput.type(image)
        this.submitButton.click()
    }
}

export const createGallery = new CreateGallery()