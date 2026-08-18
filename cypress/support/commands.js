// ***********************************************
// Кастомные команды проекта
// ***********************************************

Cypress.Commands.add('adminLogin', (email, password) => {
  cy.fixture('selectors').then((selectors) => {
    cy.visit(selectors.adminLogin.url);
    cy.get(selectors.adminLogin.emailInput).clear();
    if (email) cy.get(selectors.adminLogin.emailInput).type(email);

    cy.get(selectors.adminLogin.passwordInput).clear();
    if (password) cy.get(selectors.adminLogin.passwordInput).type(password);

    cy.contains('button, input[type="submit"]', new RegExp(selectors.adminLogin.submitButtonTextRegex, 'i'))
      .first()
      .click();
  });
});

Cypress.Commands.add('assertNoPhpErrors', () => {
  cy.fixture('selectors').then((selectors) => {
    const markers = selectors.home.phpErrorText.split(',').map((s) => s.trim());
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      markers.forEach((marker) => {
        expect(bodyText, `На странице не должно быть текста "${marker}"`).not.to.contain(marker);
      });
    });
  });
});

Cypress.Commands.add('normalizeText', (raw) => {
  const normalized = raw
    .replace(/["'«»]/g, '')
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  return cy.wrap(normalized);
});

/**
 * Ищет в разделе "Сетка сеансов" первый зал с активным фильмом
 * и возвращает его название через cy.wrap() для корректной асинхронной цепочки.
 */
Cypress.Commands.add('findAvailableHallFromAdmin', () => {
  return cy.fixture('selectors').then((selectors) => {
    cy.contains(selectors.adminPanel.sessionGridSectionHeading).scrollIntoView();

    return cy.get(selectors.adminPanel.movieInTimeline)
      .first()
      .closest(selectors.adminPanel.hallRow)
      .find(selectors.adminPanel.hallTitle)
      .invoke('text')
      .then((text) => {
        const hallName = text.trim();
        cy.log(`Найден зал с активным сеансом: "${hallName}"`);
        return cy.wrap(hallName);
      });
  });
});

/**
 * Выбирает первое доступное место, используя строгие классы приложения.
 */
Cypress.Commands.add('selectFirstAvailableSeat', () => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.booking.availableSeat)
      .first()
      .click()
      .should('have.class', 'buying-scheme__chair_selected');
  });
});