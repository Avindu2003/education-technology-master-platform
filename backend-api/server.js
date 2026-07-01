const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ status: "success", message: "Node.js API Engine is active!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server successfully started on port ${PORT}`);
});