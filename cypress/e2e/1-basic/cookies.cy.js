it("cy.setCookie() - set a browser cookie", () => {
  // https://on.cypress.io/setcookie

  cy.getCookies().should("be.empty");

  cy.setCookie("foo", "bar");

  // cy.getCookie() yields a cookie object

  cy.getCookie("foo").should("have.property", "value", "bar");
});

it("cy.clearCookie() - clear a browser cookie", () => {
  // https://on.cypress.io/clearcookie

  cy.getCookie("token").should("be.null");

  cy.get("#clearCookie .set-a-cookie").click();

  cy.getCookie("token").should("have.property", "value", "123ABC");

  // cy.clearCookies() yields null

  cy.clearCookie("token").should("be.null");

  cy.getCookie("token").should("be.null");
});

it("cy.clearCookies() - clear browser cookies", () => {
  // https://on.cypress.io/clearcookies

  cy.getCookies().should("be.empty");

  cy.get("#clearCookies .set-a-cookie").click();

  cy.getCookies().should("have.length", 1);

  // cy.clearCookies() yields null

  cy.clearCookies();

  cy.getCookies().should("be.empty");
});
