/// <reference types="cypress" />

describe('Навигация и выбор дней недели', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('позволяет кликать по дням недели в календаре', function () {
    cy.get('.page-nav__day').should('have.length.greaterThan', 1);

    cy.get('.page-nav__day').eq(1).click();
    cy.get('.page-nav__day').eq(1).should('have.class', 'page-nav__day_chosen');
  });
});