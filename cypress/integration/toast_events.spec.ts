/// <reference types="cypress" />

describe('Test hot toasts - events', () => {
  it('should show and hide toast and generate close event', () => {
    cy.get('#events').click();
    cy.get('hot-toast').as('eventsToast');
    cy.get('#closed-event-data').as('closedEventData');

    cy.get('@eventsToast').should('contain', 'Events');
    cy.wait(3000);
    cy.get('@eventsToast').should('be.visible');
    cy.get('@eventsToast').find('.hot-toast-close-btn').as('closeBtn').should('exist');
    cy.get('@closeBtn').click();
    cy.wait(800);
    cy.get('@closedEventData').then(($el) => {
      const text = $el.text();
      expect(text.indexOf('"dismissedByAction": true')).to.be.above(-1);
    });
    cy.wait(1000);
    cy.get('@eventsToast').should('not.exist');
  });
});
