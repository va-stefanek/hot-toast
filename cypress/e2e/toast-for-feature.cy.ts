import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngneat/hot-toast/src/lib/constants';

describe('Test hot toasts - forFeature', () => {
  it('should show and hide component toast with custom config applied in forFeature method of HotToastModule', () => {
    cy.get('[data-cy="for-feature-show-toast-button"]').click();
    cy.get('hot-toast').as('componentToast');
    cy.get('.hot-toast-bar-base').as('hotToastBarBase');

    cy.get('@componentToast').should('contain', 'This is forFeature Toast');
    cy.get('@hotToastBarBase').should('have.css', 'border', '4px solid rgb(113, 50, 0)');
    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('@componentToast').should('not.be.visible');
    cy.get('@componentToast').should('not.exist');
  });
});
