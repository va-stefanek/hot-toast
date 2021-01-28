/// <reference types="cypress" />

describe('Test hot toasts - observe', () => {
  it('should show and hide observe toast', () => {
    cy.get('#observe').click();
    cy.get('hot-toast').as('observeToast');

    cy.get('@observeToast').should('contain', 'Saving...');
    cy.wait(1000);
    cy.get('@observeToast').should('not.contain', 'Saving...');
    cy.get('@observeToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@observeToast').should('not.exist');
  });
});
