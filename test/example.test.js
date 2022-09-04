const puppeteer = require('puppeteer')

describe('Example', () => {
    it('should work', async () => {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto('https://example.com')
        await page.screenshot({ path: 'example.png' })
        await browser.close()
    })
    })
// End of snippet   