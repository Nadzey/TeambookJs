import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UserMenuPage extends Page {
    /**
     * define selectors using getter methods
     */
    get userMenu () {
       return $(selectors.header.userMenu);
    }

    get btnLogout() {
        return $(selectors.userMenuPage.logoutBtn);
    }

    get organizationLink() {
        return $(selectors.userMenuPage.organization);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async logout() {
        await this.userMenu.waitForDisplayed();
        await this.userMenu.click();
        await this.btnLogout.waitForDisplayed();
        await this.btnLogout.click();
    }

    async organizationLinkClick() {
        await this.organizationLink.click()
    }
}

export default new UserMenuPage();
