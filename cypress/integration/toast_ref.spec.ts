/// <reference types="cypress" />

describe('Test hot toasts - ToastRef', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show toast and closed by toastRef', () => {
    cy.get('#toast-ref').click();
    cy.clock();
    cy.get('hot-toast').as('refToast');

    cy.get('@refToast').should('contain', 'I will be closed using ref.');
    cy.tick(3000);
    cy.get('@refToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@refToast').should('not.exist');
  });
});
