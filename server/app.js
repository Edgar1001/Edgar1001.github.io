const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle email sending
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure your email transporter
    const transporter = nodemailer.createTransport({
        service: 'Outlook', // Use 'Outlook' for Hotmail accounts
        auth: {
            user: 'webtesting1001@hotmail.com', // Your email address
            pass: 'Thisisjust1001'  // Your email password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'webtesting1001@hotmail.com', // Your email to receive messages
        subject: `New message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
