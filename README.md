# Email Scraper App

## Overview
The Email Scraper App is a modern web application that allows users to scrape valid email addresses from multiple webpages. Built with Node.js for the backend and Bootstrap for the frontend, this application provides a user-friendly interface for inputting URLs and retrieving extracted email addresses.

## Features
- Input multiple URLs to scrape for email addresses.
- Extracts valid email addresses using Cheerio.
- Download extracted emails as a CSV file.
- Responsive design using Bootstrap 5.
- Smooth transitions and animations for enhanced user experience.

## Project Structure
```
email-scraper-app
├── backend
│   ├── server.js          # Entry point for the backend application
│   ├── routes
│   │   └── scrape.js      # API endpoint for scraping emails
│   ├── utils
│   │   ├── emailExtractor.js # Logic to extract emails from HTML
│   │   └── csvGenerator.js   # Logic to generate CSV from email list
│   └── package.json       # Backend dependencies and scripts
├── frontend
│   ├── index.html         # Main HTML structure for the frontend
│   ├── css
│   │   └── styles.css     # Custom styles for the frontend
│   ├── js
│   │   └── app.js         # JavaScript logic for frontend interactions
│   └── assets             # Additional assets (images/icons)
├── README.md              # Project documentation
└── .gitignore             # Files and directories to ignore by Git
```

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install the required dependencies:
   ```
   npm install
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Open `index.html` in your web browser to access the application.

## Usage
1. Enter one or more URLs in the text area (one per line).
2. Click the "Scrape Emails" button to initiate the scraping process.
3. Once the emails are extracted, a download link for the CSV file will be provided.

## Deployment
This application can be deployed on platforms like Vercel, Render, or Railway. Ensure that the backend server is properly configured to handle requests from the frontend.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.