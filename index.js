/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

// Import inquirer dynamically
import('inquirer').then((inquirerModule) => {
    const inquirer = inquirerModule.default;

    // Main function
    async function main() {
        // Get user input
        const userInput = await getUserInput(inquirer);
        const url = userInput.url;

        // Generate QR code
        const qrCode = generateQRCode(url);

        // Save user input to a text file
        saveUrlToFile(url);

        // Save QR code image
        saveQRCodeImage(qrCode, url);

        console.log('QR code generated (qr_image.png) and URL.txt saved successfully.');
    }

    // Function to generate QR code
    function generateQRCode(url) {
        return qr.imageSync(url, { type: 'png' });
    }

    // Function to prompt user for input
    function getUserInput(inquirer) {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'url',
                message: 'Enter the URL to convert to QR code:'
            }
        ]);
    }

    // Function to save URL to a text file
    function saveUrlToFile(url) {
        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
        });
    }

    // Function to save QR code image
    function saveQRCodeImage(qrCode, url) {
        const fileName = 'qr_image.png';
        const filePath = path.join(__dirname, fileName);
        fs.writeFileSync(filePath, qrCode);
    }

    // Call main function
    main();
}).catch((error) => {
    console.error('Error:', error);
});