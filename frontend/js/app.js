document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("urlForm");
  const urlInput = document.getElementById("urls");
  const resultContainer = document.getElementById("result");
  const downloadButton = document.getElementById("downloadLink");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const urls = urlInput.value
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url);

    if (urls.length === 0) {
      alert("Please enter at least one URL.");
      return;
    }

    console.log("URLs:", urls);

    try {
      const response = await fetch("http://localhost:3000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      displayResults(data.emails);
      createDownloadLink(data.csvContent);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while scraping emails. Please try again.");
    }
  });

  function displayResults(emails) {
    resultContainer.innerHTML = "";
    if (emails.length === 0) {
      resultContainer.innerHTML = "<p>No valid email addresses found.</p>";
      return;
    }

    const emailList = document.createElement("ul");
    emails.forEach((email) => {
      const listItem = document.createElement("li");
      listItem.textContent = email;
      emailList.appendChild(listItem);
    });
    resultContainer.appendChild(emailList);
  }

  function createDownloadLink(csvContent) {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    downloadButton.href = url;
    downloadButton.download = "emails.csv";
    downloadButton.style.display = "block";
  }
});

// filepath: c:\Users\USER\Desktop\email-scraper-app\backend\server.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Your routes here
app.post("/api/scrape", (req, res) => {
  // Scraping logic
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
