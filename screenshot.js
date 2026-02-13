const puppeteer = require('puppeteer');
const path = require('path');

const sites = [
  { url: 'https://the2hourentrepreneur.com', name: '2he.png' },
  { url: 'https://peak-method.com/peakbody', name: 'peakbody.png' },
  { url: 'https://peakpowerapp.com', name: 'peakpower.png' },
  { url: 'https://garciaelena.com', name: 'garciaelena.png' }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const site of sites) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.screenshot({ 
        path: path.join(__dirname, 'assets/portfolio', site.name),
        type: 'png'
      });
      console.log(`✓ ${site.name}`);
      await page.close();
    } catch (e) {
      console.log(`✗ ${site.name}: ${e.message}`);
    }
  }

  await browser.close();
})();
