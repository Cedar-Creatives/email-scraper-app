const cheerio = require('cheerio');

function extractEmails(html) {
    const $ = cheerio.load(html);
    const emails = new Set();

    // Use a regular expression to find email addresses in the HTML
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const text = $('body').text();
    const foundEmails = text.match(emailRegex);

    if (foundEmails) {
        foundEmails.forEach(email => emails.add(email));
    }

    return Array.from(emails);
}

module.exports = extractEmails;