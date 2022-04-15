const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(user_info: {username: $username, password: $password}) {
      errors {
        field
        message
      }
      user {
        user_name
        email
      }
    }
  }
`

describe("Login", () => {
  let username = "leytonodayabc123@gmail.com"
  let password = "Password12"

  it("Should fail username or email", () => {
    cy.requestGraphQL(LOGIN_MUTATION, {
      username: "fake" + username,
      password
    }).then(({ body }) => {
        expect(body.data.login.errors[0].message).to.eq("This Username does not exist")
    })
  })

  it("Should fail password", () => {
    cy.requestGraphQL(LOGIN_MUTATION, {
      username,
      password: "fake" + password
    }).then(({ body }) => {
        expect(body.data.login.errors[0].message).to.eq("This Password is incorrect")
    })
  })

  it("Should login sucessfully", () => 
    cy.requestGraphQL(LOGIN_MUTATION, {
      username,
      password
    }).then(({ body }) => {
      expect(body.data.login.user.user_name).to.equal("leyton")
    })
  )
})