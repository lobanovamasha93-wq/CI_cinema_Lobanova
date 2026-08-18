/// <reference types="cypress" />

describe('Главная страница клиентской части', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('отображается шапка сайта с названием', function () {
    cy.contains(new RegExp(this.selectors.home.pageTitleRegex, 'i')).should('be.visible');
  });

  it('отображается расписание на ближайшие дни', function () {
    cy.get('.page-nav').should('be.visible');
    cy.get('.page-nav__day').should('have.length.greaterThan', 0);
  });

  it('отображается минимум одна карточка фильма с постером и названием', function () {
    cy.get('.movie').should('have.length.greaterThan', 0);
    cy.get('.movie__title').should('be.visible');
    cy.get('.movie__poster').should('be.visible');
  });

  it('на странице отображаются названия залов и время сеансов', function () {
    cy.get('.movie-seances__hall').should('be.visible');
    cy.get('.movie-seances__time').should('be.visible');
    cy.assertNoPhpErrors();
  });
});