class DeleteGallery {

    get firstGallery() {
        return cy.get("h2 > a[class='box-title']").eq(0)
    }

    get deleteButton() {
        return cy.contains("Delete Gallery")
    }

    deleteGallery() {
        this.firstGallery.click()
        this.deleteButton.click()
    }
}

export const deleteGallery = new DeleteGallery()