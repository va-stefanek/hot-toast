/// <reference types="cypress" />

describe('Test hot toasts - emoji', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show and toast with emoji', () => {
    cy.get('#emoji').click();
    cy.get('hot-toast').as('emojiToast');

    cy.get('@emojiToast').should('contain', '👏');
    cy.wait(3000);
    cy.get('@emojiToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@emojiToast').should('not.exist');
  });
});
