it("cy.setCookie() - set a browser cookie", () => {
  // https://on.cypress.io/setcookie

  cy.getCookies().should("be.empty");

  cy.setCookie("foo", "bar");

  // cy.getCookie() yields a cookie object

  cy.getCookie("foo").should("have.property", "value", "bar");
});
