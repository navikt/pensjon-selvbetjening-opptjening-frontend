describe('Opptjening forside', () => {
    it('vg', () => {
        cy.viewport(1000, 660); //default
        cy.visit('https://www.google.no///');
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
    })
    it('cypress', () => {
        cy.viewport(1000, 660); //default
        cy.visit('http://127.0.0.1:3000/pensjon/opptjening', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
                cy.stub(win.console, 'error').as('consoleError')
            }
        }) // change URL to match your dev URL

        cy.get("#forklartseksjon").click();
        cy.get("#inntektmedmerknadpanel").click();
        cy.get("#din-okning-aar-for-aar").click();
        cy.get("#opptjening-flere-steder").click();
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
    })
})