const puppeteer = require("puppeteer");
const fs = require("fs");

const giveStringFormat = (cheapestPrice) => {
  let stringFormat = "";
  for (let str of cheapestPrice) {
    if (str !== ",") {
      stringFormat += str;
    }
  }
  return stringFormat;
};

const fetchPrice = async () => {
  const browser = await puppeteer.launch({
    headless:false
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
  );

  const url = fs.readFileSync("./url.txt", "utf-8");
  await page.goto(url);

  await page.waitForSelector(
    "#app-root > div.FlightsDayView_row__NjQyZ > div > div.FlightsDayView_container__ZjgwY > div.FlightsDayView_results__YjlmM > div:nth-child(1) > div.FqsTabs_fqsTabsWithSparkle__ZDAyO > div:nth-child(2) > button > div > div > div > span"
  );

  let cheapestPrice = await page.evaluate(() => {
    return document.querySelector(
      "#app-root > div.FlightsDayView_row__NjQyZ > div > div.FlightsDayView_container__ZjgwY > div.FlightsDayView_results__YjlmM > div:nth-child(1) > div.FqsTabs_fqsTabsWithSparkle__ZDAyO > div:nth-child(2) > button > div > div > div > span"
    )?.textContent;
  });
  let bestPrice = await page.evaluate(() => {
    return document.querySelector(
      "#app-root > div.FlightsDayView_row__NjQyZ > div > div.FlightsDayView_container__ZjgwY > div.FlightsDayView_results__YjlmM > div:nth-child(1) > div.FqsTabs_fqsTabsWithSparkle__ZDAyO > div:nth-child(1) > button > div > div > div > span"
    )?.textContent;
  });

  const lastCheapestPrice = +fs.readFileSync("./lastPrice.txt", "utf-8");

  cheapestPrice = +giveStringFormat(cheapestPrice.split(" ")[1]);

  if (lastCheapestPrice > cheapestPrice) {
    fs.writeFileSync("lastPrice.txt", cheapestPrice.toString());
    await browser.close();
    return {
      mssg: "Price Dropped ",
      price: cheapestPrice,
      bestPrice: bestPrice,
      flag: true,
    };
  } else {
    await browser.close();
    return {
      mssg: "Price has not dropped",
      price: cheapestPrice,
      bestPrice: bestPrice,
      flag: false,
    };
  }
};

module.exports = { fetchPrice };
