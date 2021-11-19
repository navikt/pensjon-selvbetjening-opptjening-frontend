describe('Opptjening forside', () => {
    it('forside', () => {
        cy.viewport(1000, 660); //default
        cy.request('/pensjon/opptjening')
            .then((response) => {
                expect(response.status).to.eq(200)
                console.log('request RESPONSE', response);
            })

        cy.visit('/pensjon/opptjening', {
            log: true,
        });

        cy.get("#forklartseksjon").click();
        cy.get("#inntektmedmerknadpanel").click();
        cy.get("#din-okning-aar-for-aar").click();
        cy.get("#opptjening-flere-steder").should("be.visible");
        cy.get("#opptjening-flere-steder").click();

        cy.get("#opptjening-flere-steder-forklart").should("be.visible");
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
    })
})