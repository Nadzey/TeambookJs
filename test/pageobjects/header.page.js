import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class HeaderPage extends Page {

  get headerUserName () {
    return $(selectors.header.userMenu);
}

  get header () {
    return $(selectors.header.header)
  }

  get planning () {
    return $(selectors.header.planning)
  }

  get actuals () {
    return $(selectors.header.actuals)
  }

  get users () {
    return $(selectors.header.users)
  }

  get dashboard () {
    return $(selectors.header.dashboard)
  }

  get projects () {
    return $(selectors.header.projects)
  }

  get logo ()  {
    return $(selectors.header.headerLogo)
  }

  get help () {
    return $(selectors.header.help)
  }

  async isHeaderLogoDisplayed() {
    return await this.logo.isDisplayed();
  }

  async openUserMenu() {
    await this.headerUserName.click();
  }

  async getHeaderElements() {
    const elements = await this.header.$$('a');
    const texts = [];
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = await element.getText();
      texts.push(text);
    }
  
    return texts;
  }
  
  
}

export default new HeaderPage();

