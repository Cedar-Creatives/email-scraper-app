const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Helper function to extract and sanitize emails from HTML
function extractEmails(html) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const rawEmails = html.match(emailRegex) || [];

  // List of valid domain extensions
  const validExtensions = [
    "com",
    "org",
    "net",
    "edu",
    "gov",
    "io",
    "info",
    "biz",
    "co",
    "us",
    "uk",
    "ca",
    "au",
    "in",
    "store",
    "id",
    "ms",
    "microsoft",
    "br",
    "hk",
    "cn",
    "mobi",
    "ru",
    "it",
    "tw",
    "se",
    "de",
    "no",
    "dk",
    "ch",
    "pl",
    "es",
    "fr",
    "sg",
    "ca",
    "au",
    "in",
  ];

  // Sanitize emails by trimming and normalizing capitalization
  const sanitizedEmails = rawEmails.map((email) => {
    email = email.trim().toLowerCase();

    // Remove phone number prefixes or other invalid characters
    email = email.replace(/^[+0-9-]+/, ""); // Remove leading numbers, +, or dashes

    // Fix invalid domain extensions
    const domainMatch = email.match(/\.([a-z]+)$/); // Match the domain extension
    if (domainMatch) {
      const domain = domainMatch[1];
      const correctedDomain = validExtensions.find((ext) =>
        domain.startsWith(ext)
      );
      if (correctedDomain) {
        email = email.replace(
          new RegExp(`\\.${domain}$`),
          `.${correctedDomain}`
        );
      }
    }

    return email;
  });

  // Remove specific unwanted emails
  const filteredEmails = sanitizedEmails.filter(
    (email) => !email.endsWith("@qq.com") && email !== "hello@merchantgenius.io"
  );

  return filteredEmails;
}

// Route to scrape emails
app.post("/api/scrape", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res
      .status(400)
      .json({ error: "Invalid request. 'urls' must be an array." });
  }

  const allEmails = new Set(); // Use a Set to avoid duplicate emails

  for (const url of urls) {
    try {
      const response = await axios.get(url); // Fetch the HTML content of the URL
      const emails = extractEmails(response.data); // Extract emails from the HTML
      emails.forEach((email) => allEmails.add(email)); // Add emails to the Set
    } catch (error) {
      console.error(`Error fetching URL ${url}:`, error.message);
    }
  }

  const emailArray = Array.from(allEmails); // Convert Set to Array
  const csvContent = emailArray.join("\n"); // Generate CSV content

  res.json({ emails: emailArray, csvContent });
});

app.get("/", (req, res) => {
  res.send("Email Scraper API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
