const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://restaurantonyx.com");
  const content = await page.content();
  console.log(content);
  await browser.close();
})();
