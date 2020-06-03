const { app, BrowserWindow } = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

let autoCollection;
let page;
const main = async () => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow({
       width: 1920,
       height: 1080,
       show: false
    });
    const url = "https://www.twitch.tv/lana_lux";
    await window.loadURL(url);
    page = await pie.getPage(browser, window);
    autoCollection = setInterval(collectPoints, 10000);
}

async function collectPoints() {
    let claimPoints = await page.$('.claimable-bonus__icon');
    if(claimPoints) {
        setTimeout(() => {
            claimPoints.click();
        }, 5000)
    }
}

function randNum() {
    return Math.floor(Math.random() * (10000 - 5000) + 5000);
}

main();