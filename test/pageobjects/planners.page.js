
import Page from './page.js';
import { readFileSync } from 'fs';
import { parse } from 'toml';


const tomlData = readFileSync('selectors.toml', 'utf-8');
const selectors = parse(tomlData);

class PlannersPage extends Page {
    constructor() {
        super();
        this.selectedCell = null;
    }

    get cell() {
        return $(selectors.plannersPage.cell);
    }

    get createBookingBtn() {
        return $(selectors.plannersPage.createBookingBtn)
    }

    get deleteBtn() {
        return $(selectors.plannersPage.deleteBooking)
    }

    get booking() {
        return $(selectors.plannersPage.booking);
    }
      
    get closeAdBtn() {
        return () => $(selectors.plannersPage.closeAddBtn);
    }

    get closeFuterBtn() {
        return () => $(selectors.plannersPage.closeFuterBtn);
    }
    

    async getCellColor() {
        return await this.cell.getCSSProperty('background-color');
    }
      
    async clickCell() {
        await this.cell.click();
        this.selectedCell = this.cell;
    }

    async closeAd() {
        const closeAdBtn = await this.closeAdBtn(); // Call the function to get the element
        await closeAdBtn.click()
    }

    async closeFuter() {
        const closeFuterBtn = await this.closeFuterBtn(); // Call the function to get the element
        await closeFuterBtn.click()
    }

    async createBooking() {
        await this.closeAd();
        await this.closeFuter();
        await this.clickCell();
        await this.closeAdBtn();
        //await this.createBookingBtn.scrollIntoView();
        await this.createBookingBtn.waitForClickable();
        await this.createBookingBtn.click();
      }

    async deleteBooking() {
   
        await this.booking.click();
        await this.deleteBtn.click();
    }
      
    async isBookingCreated() {
        const bookingElement = await this.booking;
        return await bookingElement.isDisplayed();
    }

    async hoverOverCell() {
        await this.selectedCell.hover();
    }
    
    async isTooltipDisplayed() {
        const tooltip = $('#tooltip');
        return await tooltip.isDisplayed();
    }

    async isBookingDeleted() {
        const bookingElement = await this.booking;
        return await bookingElement.isDisplayed()
      }

}

export default new PlannersPage();
