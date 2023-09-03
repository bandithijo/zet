const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const sourceDirectory = './notes';
const destinationFile = 'DEX.md';

// Initialize an array to store the formatted headers
const formattedHeaders = [];

// Regular expression to match the datetime format
const datetimeRegex = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/;

// Function to process a Markdown file and extract its header
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/^# (.+)$/m);

  if (matches && matches.length > 1) {
    const header = matches[1];

    if (header.match(datetimeRegex)) {
      const formattedHeader = header.trim().toLowerCase().replace(/[?:]/g, '').replace(/ /g, '-');
      formattedHeaders.push(`[[${formattedHeader}]]`);
    }
  }
}

// Recursive function to traverse the directory and process files
function traverseDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else if (stat.isFile() && file.endsWith('.md')) {
      processFile(filePath);
    }
  }
}

// Start the directory traversal
traverseDirectory(sourceDirectory);

// Add the DEX header
formattedHeaders.unshift(`# DEX`);

// Write the formatted headers to the destination file
fs.writeFileSync(destinationFile, formattedHeaders.join('\n'), 'utf8');

console.log(`Formatted headers written to ${destinationFile}`);
