describe('/ accessibility checks', () => {
  it('passes accessibility checks', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.log('Page header is rendered');
    cy.findByRole('heading', { name: /Gatsby Functions Fauna Demo/i }).should('be.visible');
    cy.checkAccessibility();
  });
});
