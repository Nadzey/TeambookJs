import LoginPage from '../pageobjects/login.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import UserMenuPage from '../pageobjects/userMenu.page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';

const credentialsData = readFileSync('credentials.toml', 'utf-8');
const credentials = parse(credentialsData);

const dataData = readFileSync('data.toml', 'utf-8');
const data = parse(dataData);

beforeEach(async () => {
    // ...
  })
  
afterEach(async () => {
    
  });

describe('My Login application', () => {

    it('should login with valid credentials', async () => {
       
        const email = credentials.login.valid_email;
        const password = credentials.login.valid_password;
        await LoginPage.open()
        await LoginPage.login(email, password)
        await expect(HeaderPage.headerUserName).toBeExisting()
        await expect(HeaderPage.headerUserName).toHaveTextContaining('TQ') 

        await UserMenuPage.logout();
    })

    it('should not login with invalid email', async () => {
       
        const email = credentials.login.invalid_email;
        const password = credentials.login.valid_password;
        await LoginPage.open()
        await LoginPage.login(email, password)
        await expect(LoginPage.errorMsg).toBeExisting()
        await expect(LoginPage.errorMsg).toHaveTextContaining(data.loginPage.errorMsg) 
    })

    
    it('should not login with invalid password', async () => {
       
        const email = credentials.login.valid_email;
        const password = credentials.login.invalid_password;
        await LoginPage.open()
        await LoginPage.login(email, password)
        await expect(LoginPage.errorMsg).toBeExisting()
        await expect(LoginPage.errorMsg).toHaveTextContaining(data.loginPage.errorMsg) 
    })

    it('should not login with blank email', async () => {
       
        const password = credentials.login.valid_password;
        await LoginPage.open()
        await LoginPage.login('', password)
        await expect(LoginPage.errorMsg).toBeExisting()
        await expect(LoginPage.errorMsg).toHaveTextContaining(data.loginPage.errorMsg) 
    })

    it('should not login with blank password', async () => {
       
        const email = credentials.login.valid_email;
        await LoginPage.open()
        await LoginPage.login(email, '')
        await expect(LoginPage.errorMsg).toBeExisting()
        await expect(LoginPage.errorMsg).toHaveTextContaining(data.loginPage.errorMsg) 
    })



})


