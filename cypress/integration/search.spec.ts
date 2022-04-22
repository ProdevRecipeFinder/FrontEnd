/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Search Recipes and get paginated results, 20 at a time", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("qid")
  })

  it("Should login and notify", () => {
    cy.visit("/login")
    cy.get("#username").type("leytonoday")
    cy.get("#password").type("Password12")
    cy.get(".chakra-button").contains("Login").click()
    cy.findAllByText("Login successful").should("exist")
  })

  it("Should search for recipes and get paginated results", () => {
    cy.visit("search?q=bread")
    cy.get(".Card_card__diA2r").should("have.length", 20)
    cy.get(".chakra-button").contains("Load more").click()
    cy.get(".Card_card__diA2r").should("have.length", 40)
  })
})

export {}