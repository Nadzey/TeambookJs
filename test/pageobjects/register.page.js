import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputFirstName () {
        return $(selectors.registerPage.inputFirstName);
    }

    get inputLastName () {
        return $(selectors.registerPage.inputLastName);
    }

    get inputRegisterEmail () {
        return $(selectors.registerPage.inputRegisterEmail);
    }

    get inputCompanyName () {
        return $(selectors.registerPage.inputCompanyName);
    }

    get inputRegisterPassword () {
        return $(selectors.registerPage.inputRegisterPassword);
    }

    get checkAgree () {
        return $(selectors.registerPage.agreeCheckbox);
    }

    get submit () {
        return $(selectors.registerPage.submitBtn);
    }

    get skipBtnClick () {
        return $(selectors.registerPage.skipBtn);
    }

    get errorMsg () {
        return $(selectors.loginPage.errorMsg);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async registerNew_Account (email, password, companyName, firstName, lastName) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputCompanyName.setValue(companyName);
        await this.inputRegisterEmail.setValue(email)
        await this.inputRegisterPassword.setValue(password)
        await this.checkAgree.click()
        await this.submit.click();    
    }

    async clickSkip () {
        await this.skipBtnClick.click();
    }
  
}

export default new RegisterPage();
