const o = {
  baseUrl: '/',
  ingredientModal: 'Ингредиент',
  ingredient_1: 'ингредиент 1',
  ingredient_2: 'ингредиент 2',
  ingredient_3: 'ингредиент 3',
  addButton: 'Добавить',
  orderButton: 'Оформить заказ'
}

describe('correctly work constructor', function() {

    beforeEach(function(){
      cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
      cy.visit(o.baseUrl)
    });

    it('should add bun ingredient in constructor correctly', function() {
      cy.get(`[data-cy='bun-ingredients']`).contains(o.addButton).click()
      cy.get(`[data-cy='constructor-bun-1']`)
        .contains(o.ingredient_1)
        .should('exist')
      cy.get(`[data-cy='constructor-bun-2']`)
        .contains(o.ingredient_1)
        .should('exist')
    });

    it('should add main ingredients in constructor correctly', function() {
      cy.get(`[data-cy='main-ingredients']`).contains(o.addButton).click()
      cy.get(`[data-cy='sauces-ingredients']`).contains(o.addButton).click()
      cy.get(`[data-cy='constructor-ingredients']`)
        .contains(o.ingredient_2)
        .should('exist')
      cy.get(`[data-cy='constructor-ingredients']`)
        .contains(o.ingredient_3)
        .should('exist')
    });
});

describe('correctly work modals', function() {

  beforeEach(function(){
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
    cy.visit(o.baseUrl)
  });

  it('should open modal by click on the ingredient card', function() {
    cy.contains(o.ingredientModal).should('not.exist')
    cy.get(`[data-cy='ingredient-card']`).contains(o.ingredient_1).click()
    cy.contains(o.ingredientModal).should('exist')
    cy.get('#modals').contains(o.ingredient_1).should('exist')
  })

  it('should close modal by click on close button', function() {
    cy.get(`[data-cy='ingredient-card']`).contains(o.ingredient_1).click()
    cy.contains(o.ingredientModal).should('exist')
    cy.get(`[data-cy='modal-close-button']`).click()

    cy.contains('Ингредиент').should('not.exist')
  })

  it('should close modal by click on modal layout', function() {
    cy.get(`[data-cy='ingredient-card']`).contains(o.ingredient_1).click()
    cy.contains(o.ingredientModal).should('exist')
    cy.get(`[data-cy='modal-overlay']`).click('left', {force: true})

    cy.contains(o.ingredientModal).should('not.exist')
  })
});

describe('correctly work order burger', function(){
  beforeEach(function(){
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'})
    cy.intercept('POST', 'api/orders', {fixture: 'order_post.json'}).as('postOrder');

    window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'))
    cy.setCookie('accessToken', 'testAccessToken')
    cy.visit(o.baseUrl)
  })

  afterEach(function(){
    cy.clearAllLocalStorage
    cy.clearAllCookies
  });

  it('should make burger order', function(){
    cy.get(`[data-cy='main-ingredients']`).contains(o.addButton).click()
    cy.get(`[data-cy='sauces-ingredients']`).contains(o.addButton).click()
    cy.get(`[data-cy='bun-ingredients']`).contains(o.addButton).click()
    cy.get(`[data-cy='order-button-container']`).contains(o.orderButton).click()

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1','2','3','1']
      })

    cy.get(`[data-cy='order-number']`).contains(123467).should('exist')

    cy.get(`[data-cy='modal-close-button']`).click()
    cy.get(`[data-cy='order-number']`).should('not.exist')

    cy.get(`[data-cy='constructor-bun-1']`)
      .should('not.exist')
    cy.get(`[data-cy='constructor-bun-2']`)
      .should('not.exist')
    cy.get(`[data-cy='constructor-ingredients']`)
      .should('not.exist')
    cy.get(`[data-cy='constructor-ingredients']`)
      .should('not.exist')
  });

});