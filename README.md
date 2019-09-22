# ngodarpan-scraper

A simple scraper for extract data from extract
[ngodarpan.gov.in]("https://ngodarpan.gov.in/index.php/home/statewise")

If you need just the data parse in an excel file, just click on `data.xlsx` and
then `Download`. If you need to update periodically the data, continue reading
in order to correclty install and use this scraper.

## Install

1) clone this repo `git clone https://github.com/S1M0N38/ngodarpan-scraper.git`
2) go to ngodarpan-scraper `cd ngodarpan-scraper`
3) install dependenies `npm install`

## Usage

1) go to ngodarpan-scraper `cd ngodarpan-scraper`
2) update data.json `node scrape` (this takes quite a while)
3) convert .json to .xlsx `node json2excel`
