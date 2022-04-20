/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("Show Toast Notifications", () => {

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("qid")
  })

    it("Should signup and notify",() => {
    cy.visit("/signup")
    cy.get("#username").type("leytonoday")
    cy.get("#email").type("leytonodayabc123@gmail.com")
    cy.get("#password").type("Password12")
    cy.get("#confirmPassword").type("Password12")
    cy.get(".chakra-button").contains("Create Account").click()
    cy.findAllByText("Account created for leytonoday").should("exist")
  })

  it("Should login and notify", () => {
    cy.visit("/login")
    cy.get("#username").type("leytonoday")
    cy.get("#password").type("Password12")
    cy.get(".chakra-button").contains("Login").click()
    cy.findAllByText("Login successful").should("exist")
  })

  it("Should save recipe and notify", () => {
    cy.visit("/recipe/69")
    cy.get("[data-testid='heart-switch']").click()
    cy.findAllByText("Recipe saved").should("exist")
  })

  it("Should unsave recipe and notify", () => {
    cy.get("[data-testid='heart-switch']").click()
    cy.findAllByText("Recipe unsaved").should("exist")
  })

  it("Should change username and notify", () => {
    cy.visit("/settings/account")
    cy.get("#username").type("leytonoday2")
    cy.get(".chakra-button").contains("Save").click()
    cy.findAllByText("Username changed to leytonoday2").should("exist")
    
    // change back
    cy.get("#username").type("leytonoday")
    cy.get(".chakra-button").contains("Save").click()
  })

  it("Should change password and notify", () => {
    cy.visit("/settings/security")
    cy.get("#oldPassword").type("Password12")
    cy.get("#password").type("Password12!")
    cy.get("#confirmNewPassword").type("Password12!")
    cy.get(".chakra-button").contains("Save").click()


    // change back
    cy.get("#oldPassword").type("Password12!")
    cy.get("#password").type("Password12")
    cy.get("#confirmNewPassword").type("Password12")
    cy.get(".chakra-button").contains("Save").click()
  })

  it("Should logout and notify", () => {
    cy.get(".chakra-menu__menu-button").click()
    cy.get('[type="button"]').contains("Logout").click()
    cy.findAllByText("Logout successful").should("exist")
  })
})

export {}