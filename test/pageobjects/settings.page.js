import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SettingsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get deleteOrganizationLink () {
        return $(selectors.settingPage.deleteOrganizationLink);
    }
    
    get deleteOrganizationBtn () {
        return $(selectors.deletePage.deleteBtn);
    }

    get organizationName () {
        return $(selectors.deletePage.compaanyName);
    }

    get delete () {
        return $(selectors.deletePage.deleteAccountBtn);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async delete_account (companyName) {
        await this.deleteOrganizationLink.click();
        await this.deleteOrganizationBtn.click();
        await this.organizationName.setValue(companyName);
        await this.delete.click();
    }

}

export default new SettingsPage();
