describe('Opptjening-forside', () => {
    it('forside', () => {
        cy.intercept('https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth', {
            statusCode: 200,
            body: {
                "authenticated": true,
                "name": "Test",
                "securityLevel": "4"
            },
        });
        cy.viewport(1000, 660); //default

        cy.visit('/pensjon/opptjening', {
            log: true,
        });
        cy.get("#forklartseksjon").click();
        cy.get("#inntektmedmerknadpanel").click();
        cy.get("#din-okning-aar-for-aar").click();
        cy.get("#opptjening-flere-steder").should("be.visible");
        cy.get("#opptjening-flere-steder").click();

        cy.get("#opptjening-flere-steder-forklart").should("be.visible");
        cy.get("#opptjening-flere-steder-forklart").click();

        cy.get("#opptjening-flere-steder").should('have.attr', 'animation-finished', 'true');//hvis man noen gang må fjerne denne pga bumping kan man legge til en wait hvis man ikke finner ut av en tilsvarende metode. Merk: anti-patterin

        cy.get("#opptjening-flere-steder-forklart").contains("Alle får pensjon i folketrygden. Hvis du er usikker på om du har individuell sparing eller tjenestepensjon kan du for eksempel se hos banken din eller spørre nåværende eller tidligere arbeidsgivere.");
        cy.focused().blur()

        /*
        cy.matchImageSnapshot({
            capture: 'fullPage',
        });
         */
    })
})