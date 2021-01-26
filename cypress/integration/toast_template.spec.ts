/// <reference types="cypress" />

describe('Test hot toasts - template', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and hide toast with template', () => {
    cy.get('#template').click();
    cy.get('hot-toast').as('templateToast');

    cy.get('@templateToast').find('.hot-toast-message').children().as('children');
    cy.get('@children').should('have.length', 1);
    cy.get('@children').should('contain.text', 'Custom and bold');
    cy.get('@children').first().first().should('contain.text', 'bold').and('have.css', 'font-weight', '400');
    cy.wait(3000);
    cy.get('@templateToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@templateToast').should('not.exist');
  });
});
