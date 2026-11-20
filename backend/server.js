const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Library Management System API is running!');
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    db.run(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`, 
    [name, email, password], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'User registered', userId: this.lastID });
    });
});

app.get('/api/books', (req, res) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});