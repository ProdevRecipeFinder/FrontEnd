/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Should add and remove recipe", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("qid")
  })
 
  it("Should login", () => {
    cy.visit("/login")
    cy.get("#username").type("Aaron")
    cy.get("#password").type("Password12")
    cy.get(".chakra-button").contains("Login").click()
    cy.findAllByText("Login successful").should("exist")
  })

  it("Should add recipe", () => {
    cy.visit("/recipe/69")
    cy.get("[data-testid='heart-switch']").click()
    cy.findAllByText("Recipe saved").should("exist")
  })

  it("Should remove recipe", () => {
    cy.get("[data-testid='heart-switch']").click()
    cy.findAllByText("Recipe unsaved").should("exist")
  })
})

export {}