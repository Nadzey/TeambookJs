export default class Page {
    /**
     * Opens a sub page of the page
     * @param {string} path - Path of the sub page (e.g., /path/to/page.html)
     */
    open(path) {
      return browser.url(`https://web.teambooktest.com/${path}`);
    }
  
    /**
     * Finds a web element using the provided CSS selector
     * @param {string} selector - CSS selector to locate the element
     * @returns {Element} - WebDriverIO Element representing the found element
     */
 
  }
  