import LoginPage from '../pageobjects/login.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import UserMenuPage from '../pageobjects/userMenu.page.js';
import RegisterPage from '../pageobjects/register.page.js';
import SettingsPage from '../pageobjects/settings.page.js'
import { readFileSync } from 'fs';
import { parse } from 'toml';

const credentialsData = readFileSync('credentials.toml', 'utf-8');
const credentials = parse(credentialsData);

const dataData = readFileSync('data.toml', 'utf-8');
const data = parse(dataData);

beforeEach(async () => {
    // ...
  })
  
after(async () => {
  const companyName = credentials.registerData.companyName;
  const email = credentials.registerData.register_email;
  const password = credentials.registerData.register_password;
  await LoginPage.open()
  await LoginPage.login(email, password)
  await HeaderPage.openUserMenu()
  await UserMenuPage.organizationLinkClick()
  await SettingsPage.delete_account(companyName)
  });

describe('New account registration', () => {

    it('New account registration with valid data', async () => {
       
        const firstName = credentials.registerData.firstName;
        const lastName = credentials.registerData.lastName;
        const email = credentials.registerData.register_email;
        const companyName = credentials.registerData.companyName;
        const password = credentials.registerData.register_password;
        await LoginPage.open()
        await LoginPage.clickCreatAccountLink()
        await RegisterPage.registerNew_Account(email, password, companyName, firstName, lastName)
        await RegisterPage.clickSkip()
        
        await expect(HeaderPage.headerUserName).toBeExisting()
        await expect(HeaderPage.headerUserName).toHaveTextContaining(data.registerPage.userIn) 

        await UserMenuPage.logout();
    })

    it('New account registration with existing data', async () => {
       
        const firstName = credentials.registerData.firstName;
        const lastName = credentials.registerData.lastName;
        const email = credentials.registerData.register_email;
        const companyName = credentials.registerData.companyName;
        const password = credentials.registerData.register_password;
        await LoginPage.open()
        await LoginPage.clickCreatAccountLink()
        await RegisterPage.registerNew_Account(email, password, companyName, firstName, lastName)
        
        await expect(RegisterPage.errorMsg).toBeExisting()
        await expect(RegisterPage.errorMsg).toHaveTextContaining(data.registerPage.errorMsg) 

    })

})


