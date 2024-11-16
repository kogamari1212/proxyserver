const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
    const eventId = req.query.event_id;
    const apiUrl = `https://connpass.com/api/v1/event/?event_id=${eventId}`;
    try {
        const response = await axios.get(apiUrl);
        res.setHeader('Access-Control-Allow-Origin', '*'); // CORS対応
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
