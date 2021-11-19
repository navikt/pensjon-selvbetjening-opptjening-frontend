describe('Opptjening forside tabell', () => {
    it('tabell', () => {
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