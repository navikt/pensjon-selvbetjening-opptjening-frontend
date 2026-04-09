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

    cy.get("#tabellknapp").scrollIntoView().should("be.visible").click();

    // Ensure we actually switched to table view (CI can be slower/flakier here)
    cy.get('[data-testid="dataContainer"]', { timeout: 20000 }).should(
      "be.visible",
    );

    cy.get("#tabell-vis-alle-knapp", { timeout: 20000 })
      .should("be.visible")
      .and("be.enabled");

    cy.matchImageSnapshot({ capture: "fullPage" });
  });
});
