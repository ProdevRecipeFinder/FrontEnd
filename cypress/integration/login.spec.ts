/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

function enterDetails(username: string, password: string) {
  cy.get("#username").type(username)
  cy.get("#password").type(password)
}

let username = "leytonodayabc123@gmail.com"
let password = "Password12"

describe("Login", () => {

  beforeEach(() => {
    cy.visit("/login")
  })

  it("Should fail username or email", () => {
    enterDetails("fake" + username, password)
    cy.get("#loginButton").click()

    cy.findByText("This Username does not exist").should("exist")
  })

  it("Should fail password", () => {
    enterDetails(username, "fake" + password)
    cy.get("#loginButton").click()

    cy.findByText("This Password is incorrect").should("exist")
  })

  it("Should login", () => {
    enterDetails(username, password)
    cy.get("#loginButton").click()

    cy.wait(1000)

    cy.url().should("eq", "http://localhost:3000/")
  })

})
export {}