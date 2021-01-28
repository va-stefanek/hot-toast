/// <reference types="cypress" />

describe('Test hot toasts - persistent', () => {
  it('should show and hide persistent toast, and it should not open again', () => {
    cy.get('#persistent')
      .click()
      .should(() => {
        expect(localStorage.getItem('ngneat/hototast-persist-1')).to.eq('1');
      });
    cy.get('hot-toast').as('persistentToast');
    cy.get('@persistentToast').should('contain', 'I can be opened only once across multiple browser sessions!');
    cy.wait(3000);
    cy.get('@persistentToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@persistentToast').should('not.exist');
    cy.get('#persistent')
      .click()
      .should(() => {
        expect(localStorage.getItem('ngneat/hototast-persist-1')).to.eq('0');
      });
    cy.get('@persistentToast').should('not.exist');
  });
});
