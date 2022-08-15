//Srape 3 pages from 1oz silver coins 
const puppeteer = require("puppeteer");
    (async () => {const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.apmex.com/category/25000/silver-coins?f_metalname=silver&_=1660323382387&f_productoz=1+oz&page=1")   
    let pagesToScrape = 4;
    let currentPage = 1;
    let data = [];
    while (currentPage <= pagesToScrape) {
        let newResults = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll("a.item-link")
            items.forEach((items) => {
                results.push({

                    price: items.querySelector("span.price").innerText,
                })
            })
            return results
        })
        data = data.concat(newResults)
        if (currentPage < pagesToScrape) {
            await page.click(".pagination a")
           await page.waitForSelector("a.item-link")
           await page.waitForSelector(".pagination a")
           
            

            
        }
        currentPage++;
    }
    console.log(data)
    await browser.close()

    })();