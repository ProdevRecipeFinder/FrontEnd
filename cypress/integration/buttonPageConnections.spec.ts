/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Test button and link connections work and point to corretct pages", () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce("qid")
  })

  it("Forgot password should work when not logged in", () =>{
    cy.visit("/login")
    cy.get(".chakra-link").contains("Forgot your password?").click()
    cy.url().should("eq", "http://localhost:3000/reset-password")
  })

  it("Login button should work", () => {
    cy.visit("/")
    cy.get(".chakra-button").contains("Login").click()
    cy.url().should("eq", "http://localhost:3000/login")

    cy.get("#username").type("leytonoday")
    cy.get("#password").type("Password12")
    cy.get(".chakra-button").contains("Login").click()
    cy.findAllByText("Login successful").should("exist")
  })

  it("Should go to settings page", () => {
    cy.get(".chakra-menu__menu-button").click()
    cy.get('[type="button"]').contains("Settings").click()
    cy.url().should("include", "/settings")
  })

  it("Forgot password should work when logged in", () => {
    cy.visit("/settings/security")
    cy.get(".chakra-button").contains("Forgot Password").click()

    cy.url().should("eq", "http://localhost:3000/reset-password")
  })

  it("Settings button should work", () => {
    cy.visit("/")
    cy.get("#hamburgerButton").click()
    cy.get(".chakra-button").contains("Settings").click().wait(1000)
    cy.url().should("eq", "http://localhost:3000/settings/profile")
  })

  it("MyCookbook button should work", () => {
    cy.visit("/")
    cy.get("#hamburgerButton").click()
    cy.get(".chakra-button").contains("My Cook Book").click().wait(1000)
    cy.url().should("eq", "http://localhost:3000/my-cookbook")
  })

  it ("Should change theme", () => {
    cy.visit("/")
    cy.get("#themeButton").click()
    cy.get(".chakra-ui-light").should("exist")
    cy.get("#themeButton").click()
    cy.get(".chakra-ui-dark").should("exist")
  })
})

export {}
