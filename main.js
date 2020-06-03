const {
    app,
    BrowserWindow
} = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

let streamPages;
const main = async () => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false
    });
    const window2 = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false
    });
    const url = "https://www.twitch.tv/floodz";
    const url2 = "https://www.twitch.tv/lana_lux";
    await window.loadURL(url);
    await window2.loadURL(url2);
    let page = await pie.getPage(browser, window);
    let page2 = await pie.getPage(browser, window2);
    streamPages = await browser.pages();
    setInterval(collectPoints, 10000);
}

async function collectPoints() {
    let pageList = streamPages;
    for (streamPage of pageList) {
        let claimPoints = await streamPage.$('.claimable-bonus__icon');
        if (claimPoints) {
            setTimeout(() => {
                claimPoints.click();
            }, 5000)
        }
    }
}

function randNum() {
    return Math.floor(Math.random() * (10000 - 5000) + 5000);
}

main();