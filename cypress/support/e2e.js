import './commands';

beforeEach(() => {
  cy.fixture('selectors').as('selectors');
  cy.fixture('users').as('users');
});