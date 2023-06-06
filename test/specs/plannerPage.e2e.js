import LoginPage from '../pageobjects/login.page.js'
import HeaderPage from '../pageobjects/header.page.js'
import UserMenuPage from '../pageobjects/userMenu.page.js';
import PlannersPage from '../pageobjects/planners.page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';
import { assert, expect } from 'chai';

const credentialsData = readFileSync('credentials.toml', 'utf-8');
const credentials = parse(credentialsData);

const dataData = readFileSync('data.toml', 'utf-8');
const data = parse(dataData);

before(async () => {
  const email = credentials.login.valid_email;
  const password = credentials.login.valid_password;
  await LoginPage.open()
  await LoginPage.login(email, password)
  })
  
after(async () => {
  await UserMenuPage.logout();
  });

  describe('New booking', () => {

    it('Create new Project booking', async () => {
      
      await PlannersPage.createProjectBooking();
      
      expect(await PlannersPage.isBookingCreated()).to.be.true;
    
    });

    it('Delete new Project booking', async () => {

      await PlannersPage.deleteBooking()
      
      expect(await PlannersPage.isBookingDeleted()).to.be.true;
    });

    it('Create new Time-Off booking', async () => {
      
      await PlannersPage.createTimeOffBooking();
      
      expect(await PlannersPage.isBookingCreated()).to.be.true;
    
    });
    
    it('Delete new Time-off booking', async () => {

      await PlannersPage.deleteBooking()
      
      expect(await PlannersPage.isBookingDeleted()).to.be.true;
    });
});




