/// <reference types="cypress" />

describe('Test hot toasts - observe', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and hide observe toast', () => {
    cy.get('#observe').click();
    cy.get('hot-toast').as('observeToast');

    cy.get('@observeToast').should('contain', 'Saving...');
    cy.wait(1000);
    cy.get('@observeToast').should('not.contain', 'Saving...');
    cy.get('@observeToast').then((observeToast) => {
      if (observeToast.text() === 'Settings saved!') {
        cy.get('@observeToast').should('not.be.visible');
      } else {
        cy.get('@observeToast').should('not.be.visible');
      }
      cy.wait(1000);
      cy.get('@observeToast').should('not.exist');
    });
  });
});
