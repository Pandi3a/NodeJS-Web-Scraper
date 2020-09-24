const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//Create csv file.
const writeCSV = fs.createWriteStream('scraped.csv');

// Getting the headers.

writeCSV.write(`Company Name, Address, Phone, FAX, Email, Contact Person, Website \n`);
//website URL
request('https://www.ok-power.de/fuer-strom-kunden/anbieter-uebersicht.html', (error,response, html) => {
    if(!error && response.statusCode == 200) {
       const $ = cheerio.load(html);
       //Getting the desired fields.
       const cname = $('#table_244 > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)').text();
       const adres = $('#table_244 > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1)').text();
       const adres2 = $('#table_244 > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)').text();
       const phone = $('#table_244 > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)').text();
       const fax = $('#table_244 > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)').text();
       const email = $('#table_244 > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2) > a:nth-child(1)').text();
       // Contact field is scraped with the folowing construction .html().split('<br>')[1].trim(); this will trim the output as desired.
       // It could be done with .text().replace(/(\r\n|\n|\r)/gm,"").slice(17, 36); for a precise character sliceing.
       const contact = $('#table_244 > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2)').html().split('<br>')[1].trim();
       const web = $('#table_244 > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2) > a:nth-child(1)').text();



       //Write Row to CSV.
       writeCSV.write(`${cname}, ${adres + adres2}, ${phone}, ${fax}, ${email}, ${contact}, ${web} \n`);
       console.log('Scraping Complete...');
    }
});
