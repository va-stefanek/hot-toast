/// <reference types="cypress" />

describe('Test hot toasts - snackbar', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and toast with snackbar theme', () => {
    cy.get('#snackbar').click();
    cy.get('hot-toast').as('snackbarToast');

    cy.get('@snackbarToast').should('contain', 'Snackbar');
    cy.get('@snackbarToast').find('.hot-toast-bar-base-container').should('have.css', 'bottom', '0px');
    cy.wait(3000);
    cy.get('@snackbarToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@snackbarToast').should('not.exist');
  });
});
