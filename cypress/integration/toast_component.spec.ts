/// <reference types="cypress" />

describe('Test hot toasts - component', () => {
  it('should show and hide component toast', () => {
    cy.get('#component').click();
    cy.get('hot-toast').as('componentToast');

    cy.get('@componentToast').should('contain', 'Hi 👋 from the component!');
    cy.wait(3000);
    cy.get('@componentToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@componentToast').should('not.exist');
  });
});
