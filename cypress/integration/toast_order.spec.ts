/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS, HOT_TOAST_MARGIN } from '../../projects/ngneat/hot-toast/src/lib/constants';

describe('Test hot toasts - reverse order', () => {
  it('should show toasts in reverse order', () => {
    cy.get('#toggleOrder').click();
    cy.wait(1000);
    cy.get('hot-toast').as('orderedToast');

    cy.get('@orderedToast').should('have.length', 5);
    let offset = 0;
    cy.get('@orderedToast')
      .filter((i) => i > 0)
      .each(($el) => {
        offset += $el.height() + HOT_TOAST_MARGIN;
      });
    cy.get('@orderedToast', { timeout: 0 })
      .find('.hot-toast-bar-base-container')
      .should('have.attr', 'style')
      .should('contain', `translateY(${offset}px)`);
  });
});

describe('Test hot toasts - non reverse order', () => {
  it('should show toasts in non-reverse order', () => {
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('#toggleOrder').click();
    cy.wait(1000);
    cy.get('hot-toast').as('orderedToast');

    cy.get('@orderedToast').should('have.length', 5);
    cy.get('@orderedToast', { timeout: 0 })
      .find('.hot-toast-bar-base-container')
      .should('have.attr', 'style')
      .should('contain', `translateY(0px)`);
  });
});
