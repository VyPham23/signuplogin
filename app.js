const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Use the express-session middleware to manage sessions
app.use(session({
    secret: 'your-secret-key', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
}));

// Simulated user data
const users = [];

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    // Simulated user registration
    users.push({ username, password });

    res.send(`User registered successfully: ${username}`);
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find the user by username (replace with your actual retrieval logic)
    const user = users.find((user) => user.username === username);

    if (user) {
        // Compare the password

        if (user.password === password) {
            
            req.session.user = user;
            res.send(`User logged in successfully: ${username}`);
        } else {
            res.status(401).send('Wrong password!');
        }
    } else {
        res.status(404).send('User not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
