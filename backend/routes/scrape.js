const express = require('express');
const router = express.Router();
const axios = require('axios');
const emailExtractor = require('../utils/emailExtractor');
const csvGenerator = require('../utils/csvGenerator');

router.post('/scrape', async (req, res) => {
    const urls = req.body.urls;
    const emailAddresses = [];

    try {
        for (const url of urls) {
            const response = await axios.get(url);
            const emails = emailExtractor(response.data);
            emailAddresses.push(...emails);
        }

        const csvData = csvGenerator(emailAddresses);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=emails.csv');
        res.send(csvData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping emails.' });
    }
});

module.exports = router;