const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const CSV_PATH = path.join(__dirname, 'user_submissions.csv');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Helper: escape CSV
function escapeCSV(val) {
  if (typeof val !== 'string') val = String(val);
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

app.post('/submit', (req, res) => {
  const { service, name, email, country, phone, project } = req.body;
  if (!service || !name || !email || !country || !phone || !project) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const timestamp = new Date().toISOString();
  const row = [service, name, email, country, phone, project, timestamp].map(escapeCSV).join(',') + '\n';
  fs.appendFile(CSV_PATH, row, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save data.' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`BotBuddy backend running at http://localhost:${PORT}`);
}); 