const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const users = []; // Mock user storage, replace with a database in production

// User Registration Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.username === username);
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid username or password' });

    // Create session or token
    req.session.user = { username };
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
