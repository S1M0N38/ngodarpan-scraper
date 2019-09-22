const fs = require('fs');

const cheerio = require('cheerio');
const fetch = require('node-fetch');

const URL = 'https://ngodarpan.gov.in/index.php/home/statewise';
const data = {};

async function getPages () {
  const response = await fetch(URL);
  const $ = cheerio.load(await response.text());
  const pages = [];
  const names = $('.rounded-list a').map((index, el) => $(el).text()).get();
  const urls = $('.rounded-list a').map((index, el) => el.attribs.href).get();
  for (let i = 0; i < names.length; i += 1) {
    pages.push({ name: names[i], url: urls[i] });
    data[names[i]] = [];
  }
  return pages;
}

async function scrapePage (name, url) {
  const response = await fetch(url);
  const $ = cheerio.load(await response.text());
  const table = [];
  $('.ibox-content tbody > tr').each((i, el) => {
    const row = $(el).find('td').map(
      (j, e) => $(e).text().trim().split('\n')
        .join(' ')
    ).get();
    table.push(row.slice(1));
  });
  data[name] = data[name].concat(table);
}

async function scrape () {
  const pages = await getPages();
  const promises = [];
  for (const page of pages) {
    // https://ngodarpan.gov.in/index.php/home/statewise_ngo/81/35/1
    const [rows, id] = page.url.split('/').splice(-3).slice(0, 2);
    for (let pageN = 1; (pageN - 1) * 100 < rows; pageN += 1) {
      const url = `${URL}_ngo/${rows}/${id}/${pageN}?per_page=100`;
      promises.push(scrapePage(page.name, url));
    }
  }
  await Promise.all(promises);
}

scrape().then(() => {
  fs.writeFile('output.json', JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
    console.log('JSON file has been saved.');
  });
});
