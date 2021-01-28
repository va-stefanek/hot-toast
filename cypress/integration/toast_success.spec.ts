/// <reference types="cypress" />

describe('Test hot toasts - success', () => {
  it('should show and hide success toast', () => {
    cy.get('#success').click();
    cy.get('hot-toast').as('successToast');

    cy.get('@successToast').should('contain', 'Successfully toasted!');
    cy.wait(3000);
    cy.get('@successToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@successToast').should('not.exist');
  });
});
