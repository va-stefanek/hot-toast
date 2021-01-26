/// <reference types="cypress" />

describe('Test hot toasts - themed', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and hide themed toast', () => {
    cy.get('#themed').click();
    cy.get('hot-toast', { timeout: 0 }).as('themedToast');
    cy.get('.hot-toast-bar-base', { timeout: 0 }).as('toastBase');
    cy.get('.hot-toast-checkmark-icon').as('checkMarkIcon');

    cy.get('@themedToast').should('contain', 'Look at my styles');
    cy.get('@toastBase').should('have.css', 'border', '1px solid rgb(113, 50, 0)');
    cy.get('@toastBase').should('have.css', 'padding', '16px');
    cy.get('@toastBase').should('have.css', 'color', 'rgb(113, 50, 0)');
    cy.get('@checkMarkIcon', { timeout: 0 }).should('have.css', 'background-color', 'rgb(113, 50, 0)');
    cy.get('@checkMarkIcon', { timeout: 0 }).then(($el) => {
      const win = $el[0].ownerDocument.defaultView;
      const before = win.getComputedStyle($el[0], 'after');
      const borderColor = before.getPropertyValue('border-color');
      expect(borderColor).to.eq('rgb(255, 250, 238)');
    });
    cy.wait(3000);
    cy.get('@themedToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@themedToast').should('not.exist');
  });
});
