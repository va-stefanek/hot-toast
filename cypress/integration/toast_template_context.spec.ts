/// <reference types="cypress" />

import { ENTER_ANIMATION_DURATION } from '../../projects/ngneat/hot-toast/src/lib/constants';

describe('Test hot toasts - template with context', () => {
  it('should show and hide toast with template with context', () => {
    cy.get('#template-context').click();
    cy.get('hot-toast').as('templateToast');

    cy.get('@templateToast').find('.hot-toast-message').children().as('children');
    cy.get('@children').should('have.length', 1);
    cy.get('@children').should('contain.text', '\n  Custom and bold with data: {\n  "fact": "1+1 = 2"\n}\n');
    cy.get('@children').first().first().should('contain.text', 'bold').and('have.css', 'font-weight', '400');
    cy.get('@templateToast').find('.hot-toast-close-btn').as('closeBtn').should('exist');
    cy.wait(ENTER_ANIMATION_DURATION);
    cy.get('@closeBtn').click();
    cy.get('@templateToast').should('not.be.visible');
    cy.get('@templateToast').should('not.exist');
  });
});
