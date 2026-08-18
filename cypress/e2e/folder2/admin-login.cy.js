/// <reference types="cypress" />

describe('Логин в админку', () => {
  it('happy path: с валидными данными администратор попадает в панель управления', function () {
    const { email, password } = this.users.happyPath;

    cy.adminLogin(email, password);

    cy.contains(this.selectors.adminPanel.hallsManagementSectionHeading).should('be.visible');
    cy.url().should('include', '/admin');
    cy.assertNoPhpErrors();
  });

  it('sad path: с невалидными данными доступ в панель управления не предоставляется', function () {
    this.users.sadPath.forEach((testCase) => {
      cy.log(`Кейс: ${testCase.description}`);
      cy.adminLogin(testCase.email, testCase.password);

      if (testCase.email === '' && testCase.password === '') {
        // Проверяем, что форма логина осталась видимой и блокируется браузерной валидацией
        cy.get(this.selectors.adminLogin.form).should('be.visible');
      } else {
        cy.contains('Ошибка авторизации!').should('be.visible');
        cy.go('back');
      }
    });
  });
});