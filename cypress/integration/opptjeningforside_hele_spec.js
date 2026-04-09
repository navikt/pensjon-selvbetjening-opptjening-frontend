describe("Opptjening-forside", () => {
  it("forside", () => {
    cy.intercept(
      "https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth",
      {
        statusCode: 200,
        body: { authenticated: true, name: "Test", securityLevel: "4" },
      },
    );

    cy.intercept("GET", "**/pensjon/opptjening**").as("opptjening");

    cy.viewport(1000, 660);

    cy.visit("/pensjon/opptjening", { log: true });
    cy.wait("@opptjening");

    cy.get("#forklartseksjon").should("be.visible").click();
    cy.get("#inntektmedmerknadpanel").should("be.visible").click();
    cy.get("#din-okning-aar-for-aar").should("be.visible").click();

    cy.get("#opptjening-flere-steder").should("be.visible").click();

    cy.get("#opptjening-flere-steder-forklart").should("be.visible").click();

    cy.get("#opptjening-flere-steder").should(
      "have.attr",
      "animation-finished",
      "true",
    );

    cy.get("#opptjening-flere-steder-forklart").should(
      "contain",
      "Alle får pensjon i folketrygden.",
    );

    cy.focused().blur();

    // If you re-enable snapshots, do it after the animation + text assertion:
    // cy.matchImageSnapshot({ capture: "fullPage" });
  });
});
