describe("Opptjening forside tabell", () => {
  it("tabell", () => {
    cy.intercept(
      "https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth",
      {
        statusCode: 200,
        body: { authenticated: true, name: "Test", securityLevel: "4" },
      },
    );

    cy.intercept("GET", "**/pensjon/opptjening**").as("opptjening");

    cy.viewport(1000, 660);
    cy.visit("/pensjon/opptjening");
    cy.wait("@opptjening");

    cy.get("#tabellknapp").should("be.visible").click();

    // wait for the table view to be ready (DOM-based, not network-based)
    cy.get("#tabell-vis-alle-knapp")
      .should("exist")
      .and("be.visible")
      .and("be.enabled");

    cy.matchImageSnapshot({ capture: "fullPage" });
  });
});
