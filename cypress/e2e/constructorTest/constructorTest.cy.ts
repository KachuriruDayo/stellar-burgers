

describe('correctly work constructor', function() {
    beforeEach(function(){
      cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
      cy.visit('http://localhost:4000');
    });

    it('should add bun ingredient in constructor correctly', function() {
      cy.get(`[data-cy='bun-ingredients']`).contains('Добавить').click()
      cy.get(`[data-cy='constructor-bun-1']`)
        .contains('ингредиент 1')
        .should('exist')
      cy.get(`[data-cy='constructor-bun-2']`)
        .contains('ингредиент 2')
        .should('exist')
    });

    it('should add main ingredients in constructor correctly', function() {
      cy.get(`[data-cy='main-ingredients']`).contains('Добавить').click()
      cy.get(`[data-cy='sauces-ingredients']`).contains('Добавить').click()
    });
}); 