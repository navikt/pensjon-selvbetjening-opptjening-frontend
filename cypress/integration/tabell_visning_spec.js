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

    // ensure the tab view is actually rendered before snapshot
    cy.get("#tabell-vis-alle-knapp").should("be.visible");

    // if tab click triggers another fetch, waiting again removes timing flake
    cy.wait("@opptjening");

    // extra guard: at least one stable element in the table view exists
    cy.get("#tabell-vis-alle-knapp").should("be.enabled");

    cy.matchImageSnapshot({ capture: "fullPage" });
  });
});
