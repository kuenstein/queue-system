const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let queues = {
    BILLING: [],
    CASHIER: [],
    PHILHEALTH: []
};

let currentNumbers = {
    BILLING: null,
    CASHIER: null,
    PHILHEALTH: null
};

// Generate a queue number
app.post('/queue', (req, res) => {
    const { service } = req.body;
    if (!queues[service]) {
        return res.status(400).json({ error: 'Invalid service' });
    }
    const number = `${service.charAt(0)}${queues[service].length + 1}`;
    queues[service].push(number);
    res.json({ number });
});

// Get queue status
app.get('/queue', (req, res) => {
    res.json({
        current: currentNumbers,
        waiting: queues
    });
});

// Call next number
app.post('/call', (req, res) => {
    const { service } = req.body;
    if (!queues[service] || queues[service].length === 0) {
        return res.status(400).json({ error: 'No one in queue' });
    }
    currentNumbers[service] = queues[service].shift();
    res.json({ current: currentNumbers[service] });
});

// Recall last number
app.post('/recall', (req, res) => {
    const { service } = req.body;
    if (!currentNumbers[service]) {
        return res.status(400).json({ error: 'No number to recall' });
    }
    res.json({ current: currentNumbers[service] });
});

app.listen(port, () => {
    console.log(`Queue system running at http://localhost:${port}`);
});
