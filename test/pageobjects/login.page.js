import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail () {
        return $(selectors.loginPage.inputEmail);
    }

    get inputPassword () {
        return $(selectors.loginPage.inputPassword);
    }

    get btnSubmit () {
        return $(selectors.loginPage.loginButton);
    }

    get errorMsg () {
        return $(selectors.loginPage.errorMsg);
    }

    get createAccountLink () {
        return $(selectors.loginPage.createAccount);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async clickCreatAccountLink () {
        await this.createAccountLink.click()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

export default new LoginPage();
