//When using this for the first time you will need to
//change the show: false to show: true and login into twitch in the window.
//you can then change it back and run the script invisibly.
const {
    app,
    BrowserWindow
} = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

let streamer = 'radpuppy'

let page;
const main = async () => {
    console.log('Starting auto-collection on ' + streamer + ' stream.');
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
        console.log('Collected ' + streamer + ' ' + collectionCount + '    ' + createTimeStamp());
        collectionCount += 1;
        setTimeout(() => {
            claimPoints.click();
        }, 5000)
    }
}

main();

function createTimeStamp() {
    let d = new Date();
    let h = Number(d.getHours()) <= 12 ? d.getHours() : (d.getHours() - 12);
    let m = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes();
    let timeStamp = h + ':' + m;
    return timeStamp;
}