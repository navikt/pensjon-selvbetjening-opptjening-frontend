describe('Opptjening forside', () => {
    it('vg', () => {
        cy.viewport(1000, 660); //default
        cy.visit('https://www.google.no');
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
    })
    it('cypress', () => {
        cy.viewport(1000, 660); //default
        /*cy.request('http://127.0.0.1:3000/pensjon/opptjening')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(500)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
                console.log('request RESPONSE', response);
            })*/

        cy.request('http://127.0.0.1:4000/opptjening')
            .then((response) => {
            expect(response.status).to.eq(200)
            //expect('http://127.0.0.1:4000/opptjening').to.eq(response.statusText);
            expect({}).to.deep.equal(response.body)
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
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