/// <reference types="cypress" />

const stefan = {
  username: "Stefan",
  email: "stefan@example.com",
  password: "Z6#6%xfLTarZ9U",
};
const tom = {
  username: "Tom",
  email: "tom@example.com",
  password: "L%e$xZHC4QKP@F",
};

describe("Bug Fix: Sending Messages", () => {
  it("setup", () => {
    cy.signup(stefan.username, stefan.email, stefan.password);
    cy.logout();
    cy.signup(tom.username, tom.email, tom.password);
    cy.logout();
  });

  it("sends message in a new conversation", () => {
    cy.login(stefan.username, stefan.password);

    cy.get("input[name=search]").type("Tom");
    cy.contains("Tom").click();

    cy.get("input[name=text]").type("First message{enter}");
    cy.get("input[name=text]").type("Second message{enter}");
    cy.get("input[name=text]").type("Third message{enter}");

    cy.contains("First message");
    cy.contains("Second message");
    cy.contains("Third message");
  });

  it("checks the unread messages indicator", () => {
    cy.reload();
    cy.login(tom.username, tom.password);
    cy.get("span[class=makeStyles-unreadMessages-29]").should("contain", "3");

    cy.contains("Stefan").click();
  });

  it("checks the read indicator in ActiveChat", () => {
    cy.reload();
    cy.login(stefan.username, stefan.password);
    cy.contains("Tom").click();

    cy.contains("Third message").then(() => {
      cy.get("div[data-testid='read-avatar']").should('be.visible');
    })
  });
});
