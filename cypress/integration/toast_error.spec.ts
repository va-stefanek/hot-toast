/// <reference types="cypress" />

describe('Test hot toasts - error', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and hide error toast', () => {
    cy.get('#error').click();
    cy.get('hot-toast').as('errorToast');

    cy.get('@errorToast').should('contain', "This didn't work.");
    cy.wait(4000);
    cy.get('@errorToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@errorToast').should('not.exist');
  });
});
