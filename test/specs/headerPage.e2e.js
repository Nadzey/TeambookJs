import LoginPage from '../pageobjects/login.page.js';
import HeaderPage from '../pageobjects/header.page.js';
import UserMenuPage from '../pageobjects/userMenu.page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';
import { assert } from 'chai';

const credentialsData = readFileSync('credentials.toml', 'utf-8');
const credentials = parse(credentialsData);

const dataData = readFileSync('data.toml', 'utf-8');
const data = parse(dataData);

before(async () => {
  const email = credentials.login.valid_email;
  const password = credentials.login.valid_password;
  await LoginPage.open();
  await LoginPage.login(email, password);
});

after(async () => {
  await UserMenuPage.logout();
});

describe('Header Section', () => {
  it('should have correct header elements', async () => {
    const elements = await HeaderPage.getHeaderElements();

    // check links count
    assert.equal(Object.keys(elements).length, 6);

    // check if the text is correct
    assert.equal(elements[5], data.header.projects);
    assert.equal(elements[4], data.header.users);
    assert.equal(elements[1], data.header.planning);
    assert.equal(elements[2], data.header.actuals);
    assert.equal(elements[3], data.header.dashboard);
  });

  it('should display header logo', async () => {
    const isDisplayed = await HeaderPage.isHeaderLogoDisplayed();
    assert.isTrue(isDisplayed, data.header.faileText);
  });

});
