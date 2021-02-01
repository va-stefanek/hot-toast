/// <reference types="cypress" />

import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngneat/hot-toast/src/lib/constants';

describe('Test hot toasts - ToastRef', () => {
  it('should show toast and closed by toastRef', () => {
    cy.get('#toast-ref').click();
    cy.clock();
    cy.get('hot-toast').as('refToast');

    cy.get('@refToast').should('contain', 'I will be closed using ref.');
    cy.tick(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@refToast').should('not.be.visible');
    cy.get('@refToast').should('not.exist');
  });
});
