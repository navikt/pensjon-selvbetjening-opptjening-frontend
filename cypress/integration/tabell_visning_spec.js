describe('Opptjening forside tabell', () => {
    it('cypress', () => {
        cy.visit('/') // change URL to match your dev URL

        cy.get("#tabellknapp").scrollIntoView();
        cy.get("#tabellknapp").should("be.visible");//vent til knapp vises
        cy.get("#tabellknapp").click();
        cy.matchImageSnapshot({
            capture: 'viewport',
        });
    })
})