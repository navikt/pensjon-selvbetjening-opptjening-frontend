describe('Opptjening forside tabell', () => {
    it('tabell', () => {
        cy.intercept('https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth', {
            statusCode: 200,
            body: {
                "authenticated": true,
                "name": "Test",
                "securityLevel": "4"
            },
        });
        cy.viewport(1000, 660); //default
        cy.visit('/pensjon/opptjening') // change URL to match your dev URL

        cy.get("#tabellknapp").scrollIntoView();
        cy.get("#tabellknapp").should("be.visible");//vent til knapp vises
        cy.get("#tabellknapp").click();
        cy.get("#tabell-vis-alle-knapp").should("be.visible");
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
    })
})