/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Change Username", () => {

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

  it("Should change username", () => {
    cy.visit("/settings/account")
    cy.get("#username").type("Aaron2")
    cy.get(".chakra-button").contains("Save").click()
    cy.findAllByText("Username changed to Aaron2").should("exist")

    // change back
    cy.get("#username").type("Aaron")
    cy.get(".chakra-button").contains("Save").click()
  })
})

export {}