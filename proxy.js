const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // CORS対応

app.get('/proxy', async (req, res) => {
  const eventId = req.query.event_id;
  if (!eventId) {
    res.status(400).send('Event ID is required');
    return;
  }

  const apiUrl = `https://connpass.com/api/v1/event/?event_id=${eventId}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'connpass-proxy/1.0 (https://connpass-proxy.onrender.com)', // User-Agentを指定
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(error.response?.status || 500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
