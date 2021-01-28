/// <reference types="cypress" />

describe('Test hot toasts - success', () => {
  it('should show and hide success toast', () => {
    cy.get('#warning').click();
    cy.get('hot-toast').as('warningToast');

    cy.get('@warningToast').should('contain', 'Please be cautious!');
    cy.wait(4000);
    cy.get('@warningToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@warningToast').should('not.exist');
  });
});
