describe('Opptjening forside', () => {
    it('forside', () => {
        cy.viewport(1000, 660); //default
        cy.request('http://127.0.0.1:3000/pensjon/opptjening')
            .then((response) => {
                expect(response.status).to.eq(200)
                console.log('request RESPONSE', response);
            })

        cy.visit('http://127.0.0.1:3000/pensjon/opptjening', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
                cy.stub(win.console, 'error').as('consoleError')
            },
            log: true,
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