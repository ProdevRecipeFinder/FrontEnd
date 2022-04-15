describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should display the navbar", () => {
    cy.findByText("Recipe Finder").should("exist");
  })
})