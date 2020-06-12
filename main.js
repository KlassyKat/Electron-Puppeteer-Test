const {
    app,
    BrowserWindow
} = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

let streamer = ''

let page;
const main = async () => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false
    });
    let url = "https://www.twitch.tv/" + streamer;

    window.webContents.setAudioMuted(true);
    await window.loadURL(url);
    page = await pie.getPage(browser, window);
    setInterval(collectPoints, 10000);
}
let collectionCount = 1;
async function collectPoints() {
    let claimPoints = await page.$('.claimable-bonus__icon');
    if (claimPoints) {
        console.log('Collected ' + streamer + ' ' + collectionCount);
        collectionCount += 1;
        setTimeout(() => {
            claimPoints.click();
        }, 5000)
    }
}

main();