/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Change Theme", () => {

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("qid")
  })

  it("Should login", () => {
    cy.visit("/login")
    cy.get("#username").type("leytonoday")
    cy.get("#password").type("Password12")
    cy.get(".chakra-button").contains("Log In").click()
  })

  it("Should change theme", () => {
    cy.visit("/settings/appearance")
    cy.get("#darkThemeButton").click()
    cy.get(".chakra-ui-dark").should("exist")
  })


})

export {}