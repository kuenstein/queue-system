// server.js (Node.js Backend for Laboratory Queue System)
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let queue = [];
let currentNumber = null;

// Generate a queue number
app.post('/queue', (req, res) => {
    const number = `L${queue.length + 1}`;
    queue.push(number);
    res.json({ number });
});

// Call next customer
app.post('/call', (req, res) => {
    if (queue.length === 0) {
        return res.status(400).json({ error: 'No one in queue' });
    }
    currentNumber = queue.shift();
    res.json({ current: currentNumber });
});

// Get queue status
app.get('/queue', (req, res) => {
    res.json({ current: currentNumber, waiting: queue });
});

app.listen(port, () => {
    console.log(`Laboratory Queue System running at http://localhost:${port}`);
});
