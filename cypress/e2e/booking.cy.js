/// <reference types="cypress" />

describe('Бронирование билета в доступный зал', () => {
  it('выбирает доступный сеанс на главной странице и успешно бронирует билет', function () {
    const selectors = this.selectors;

    cy.visit('/', { timeout: 60000 });
    cy.contains(new RegExp(selectors.home.pageTitleRegex, 'i'), { timeout: 15000 }).should('be.visible');

    cy.get(selectors.home.sessionTimeLink)
      .not('.acceptin-button-disabled')
      .first()
      .click();

    cy.contains(selectors.booking.sessionStartLabel, { timeout: 15000 }).should('be.visible');

    cy.selectFirstAvailableSeat();

    cy.contains('button', new RegExp(selectors.booking.bookButtonTextRegex, 'i')).click();

    cy.contains('Вы выбрали билеты:', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Получить код бронирования', { matchCase: false }).click();
    cy.contains('Электронный билет').should('be.visible');

    cy.assertNoPhpErrors();
  });
});