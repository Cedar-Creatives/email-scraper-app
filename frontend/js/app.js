document.addEventListener("DOMContentLoaded", function () {
  const textModeBtn = document.getElementById("textModeBtn");
  const urlModeBtn = document.getElementById("urlModeBtn");
  const textMode = document.getElementById("textMode");
  const urlMode = document.getElementById("urlMode");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Toggle between Text Mode and URL Mode
  textModeBtn.addEventListener("click", () => {
    textMode.classList.remove("d-none");
    urlMode.classList.add("d-none");
    textModeBtn.classList.add("btn-primary");
    textModeBtn.classList.remove("btn-outline-primary");
    urlModeBtn.classList.add("btn-outline-primary");
    urlModeBtn.classList.remove("btn-primary");
  });

  urlModeBtn.addEventListener("click", () => {
    urlMode.classList.remove("d-none");
    textMode.classList.add("d-none");
    urlModeBtn.classList.add("btn-primary");
    urlModeBtn.classList.remove("btn-outline-primary");
    textModeBtn.classList.add("btn-outline-primary");
    textModeBtn.classList.remove("btn-primary");
  });

  // Toggle Dark Mode
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });

  // Handle Text Mode Form Submission
  document
    .getElementById("textForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const text = document.getElementById("textInput").value;

      if (!text.trim()) {
        alert("Please paste some text.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }), // Send text input to the backend
        });

        if (!response.ok) throw new Error("Failed to scrape emails.");

        const data = await response.json();
        createDownloadLink(data.csvContent, "textDownloadLink");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while scraping emails.");
      }
    });

  // Handle URL Mode Form Submission
  document
    .getElementById("urlForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const urls = document
        .getElementById("urlInput")
        .value.split("\n")
        .map((url) => url.trim())
        .filter((url) => url);

      if (urls.length === 0) {
        alert("Please enter at least one URL.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        });

        if (!response.ok) throw new Error("Failed to scrape emails.");

        const data = await response.json();
        createDownloadLink(data.csvContent, "urlDownloadLink");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while scraping emails.");
      }
    });

  function createDownloadLink(csvContent, linkId) {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById(linkId);
    downloadLink.href = url;
    downloadLink.download = "emails.csv";
    downloadLink.style.display = "block";
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
