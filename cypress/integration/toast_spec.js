/// <reference types="cypress" />

describe('Test hot toasts', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });
  it('should show and hide success toast', () => {
    cy.get('#success').click();
    cy.get('hot-toast').as('successToast');

    cy.get('@successToast', { timeout: 0 }).should('contain', 'Successfully toasted!');
    cy.wait(3000);
    cy.get('@successToast', { timeout: 0 }).should('not.be.visible');
    cy.wait(1000);
    cy.get('@successToast', { timeout: 0 }).should('not.exist');
  });
  it('should show and hide error toast', () => {
    cy.get('#error').click();
    cy.get('hot-toast').as('errorToast');

    cy.get('@errorToast', { timeout: 0 }).should('contain', "This didn't work.");
    cy.wait(4000);
    cy.get('@errorToast', { timeout: 0 }).should('not.be.visible');
    cy.wait(1000);
    cy.get('@errorToast', { timeout: 0 }).should('not.exist');
  });
  it('should show and hide observe toast', () => {
    cy.get('#observe').click();
    cy.get('hot-toast').as('observeToast');

    cy.get('@observeToast', { timeout: 0 }).should('contain', 'Saving...');
    cy.wait(1000);
    cy.get('@observeToast', { timeout: 0 }).should('not.contain', 'Saving...');
    cy.get('@observeToast').then((observeToast) => {
      if (observeToast.text() === 'Settings saved!') {
        cy.wait(2000);
        cy.get('@observeToast', { timeout: 0 }).should('not.be.visible');
      } else {
        cy.wait(3000);
        cy.get('@observeToast', { timeout: 0 }).should('not.be.visible');
      }
      cy.wait(1000);
      cy.get('@observeToast', { timeout: 0 }).should('not.exist');
    });
  });
  it('should show multi-line toast', () => {
    cy.get('#multi').click();
    cy.get('hot-toast').as('multiToast');

    cy.get('@multiToast').should(
      'contain',
      "This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller."
    );
    cy.wait(350);
    cy.get('@multiToast', { timeout: 0 }).get('.hot-toast-close-btn', { timeout: 0 }).click();
    cy.wait(50);
    cy.get('@multiToast', { timeout: 0 }).should('not.be.visible');
    cy.wait(1000);
    cy.get('@multiToast', { timeout: 0 }).should('not.exist');
  });
});
