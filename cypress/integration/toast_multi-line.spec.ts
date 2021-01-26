/// <reference types="cypress" />

describe('Test hot toasts - multi line', () => {
  it('open the dev app', () => {
    cy.visit('/');
  });

  it('should show multi-line toast', () => {
    cy.get('#multi').click();
    cy.get('hot-toast').as('multiToast');

    cy.get('@multiToast').should(
      'contain',
      "This toast is super big.I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller."
    );
    cy.get('@multiToast')
      .find('.hot-toast-message')
      .then((el) => expect(countLines(el)).to.be.above(1));
    cy.wait(350);
    cy.get('@multiToast').get('.hot-toast-close-btn').click();
    cy.wait(50);
    cy.get('@multiToast').should('not.be.visible');
    cy.wait(1000);
    cy.get('@multiToast').should('not.exist');
  });
});

function countLines(el: JQuery<HTMLElement>) {
  const divHeight = el.outerHeight();
  const lineHeight = parseInt(el.css('line-height'), 10);
  const lines = divHeight / lineHeight;
  return lines;
}
